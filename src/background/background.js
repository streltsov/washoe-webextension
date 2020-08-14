import { sendMessageToActiveTab } from "../utils/webExtension";
import { INTERVALS } from "../constants";
import localforage from "localforage";

import { mergeMap } from "rxjs/operators";
import { from, interval } from "rxjs";

const getWordToRepeat = _ => new Promise(resolve =>
  localforage.iterate(({ notifyOn, ...rest }) => notifyOn < Date.now() ? resolve(rest) : null)
);

const subscribe = interval(5000)
  .pipe(mergeMap(_ => from(getWordToRepeat())))
  .subscribe(data => sendMessageToActiveTab({ action: "notification", data }));

const showAddWordForm = _ =>
  sendMessageToActiveTab({ action: "showAddWordForm" });

const addWord = data => {
  const id = Date.now();
  localforage.setItem(id, { id, ...data, stage: 0, notifyOn: Date.now() + INTERVALS[0] })
    .then(_ => sendMessageToActiveTab({ action: "closeAddWordForm" }))
    .catch(error => console.error("addWord -> localforage.setItem: ", error));

const actions = {
  incrementWordStage,
  showAddWordForm,
  addWord
};

browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));
