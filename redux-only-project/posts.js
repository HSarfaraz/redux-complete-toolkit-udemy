const { createStore, applyMiddleware } = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;

// customLogger middleware
const customLogger = (middlewareAPI) => {
  return (next) => {
    return (action) => {
      console.log("Action fired", action);
      return next(action);
    };
  };
};

// Action constants
const REQUEST_STARTED = "REQUEST_STARTED";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILED = "FETCH_FAILURE";

// Initial state
const initialState = {
  posts: [],
  error: "",
  loading: false,
};

// Actions
const fetchPostRequest = () => ({ type: REQUEST_STARTED });
const fetchPostSuccess = (posts) => ({ type: FETCH_SUCCESS, payload: posts });
const fetchPostFailed = (error) => ({
  type: FETCH_FAILED,
  payload: error,
  loading: false,
});

// Async action to make a request
const fetchPosts = () => {
  return async (dispatch) => {
    try {
      // dispatch
      dispatch(fetchPostRequest());
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // success action
      dispatch(fetchPostSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostFailed(error.message));
    }
  };
};

// Reducer
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, posts: action.payload };
    case FETCH_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Store
const store = createStore(
  postsReducer,
  applyMiddleware(customLogger, thunkMiddleware)
);

// Subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

// Dispatch async action
store.dispatch(fetchPosts());
