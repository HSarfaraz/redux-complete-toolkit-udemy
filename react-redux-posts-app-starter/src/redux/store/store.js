import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { postsReducer } from "../reducers/postReducer";
import reduxThunk from "redux-thunk";

const middlewares = [reduxThunk];
const middlewareEnhancers = applyMiddleware(...middlewares);
const store = createStore(postsReducer, composeWithDevTools());

export default store;
