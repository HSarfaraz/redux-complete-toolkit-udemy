import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slice/postsSlice";

//configure store
const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;

//dispatch
// store.dispatch(fetchPosts());
