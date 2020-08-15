import { sendMessageToActiveTab } from "../utils/webExtension";
import { CHECK_WORDS_INTERVAL } from "../constants";
import { mergeMap } from "rxjs/operators";
import { from, interval } from "rxjs";
import localforage from "localforage";

const getWordToRepeat = _ => new Promise(resolve =>
  localforage.iterate(({ notifyOn, ...rest }) => {
    notifyOn < Date.now() ? resolve(rest) : null;
  }));

const subscribe = interval(CHECK_WORDS_INTERVAL)
  .pipe(mergeMap(_ => from(getWordToRepeat())))
  .subscribe(data => sendMessageToActiveTab({ action: "notification", data }));

