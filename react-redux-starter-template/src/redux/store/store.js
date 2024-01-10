import { createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import notesReducer from "../reducer/notesReducer";

const store = createStore(notesReducer, composeWithDevTools());

export default store;
