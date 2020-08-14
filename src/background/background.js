import { sendMessageToActiveTab } from "../utils/webExtension";
import { INTERVALS } from "../constants";
import localforage from "localforage";

import { from, interval } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";


const showAddWordForm = _ =>
  sendMessageToActiveTab({ action: "showAddWordForm" });

const addWord = data =>
  localforage.setItem(data.word, { ...data, stage: 0, notifyOn: Date.now() + INTERVALS[0] })
    .then(_ => sendMessageToActiveTab({ action: "closeAddWordForm" }))
    .catch(error => console.error("addWord -> localforage.setItem: ", error));

const getWordToRepeat = _ => new Promise(resolve =>
  localforage.iterate(({ notifyOn, ...rest }) => notifyOn < Date.now() ? resolve(rest) : null)
);

const subscribe = interval(5000)
  .pipe(mergeMap(_ => from(getWordToRepeat())))
  .subscribe(data => sendMessageToActiveTab({ action: "notification", data }));

const actions = {
  showAddWordForm,
  addWord
};

browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));
