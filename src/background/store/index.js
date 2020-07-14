import { createStore } from "redux";
import { wrapStore } from "webext-redux";
import { reducers } from "./reducers";

const store = createStore(reducers);
wrapStore(store);

export { store };

