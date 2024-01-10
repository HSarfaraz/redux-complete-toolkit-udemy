const { combineReducers } = require("redux");
const { createStore } = require("redux");

//Initial state
// we are going to keep the post in  an array

const initialState = {
  posts: [],
};

//users
const usersInitialState = {
  users: [],
};
//Actions (action, action creator)

//Action Types
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const ADD_USER = "ADD_USER";

//Add post
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

//Remove or delete post
const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

//Add user
const addUserAction = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

//reducer
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        posts: [...state.posts, action.payload],
      };
    case REMOVE_POST:
      return {
        posts: state.posts.filter((post) => {
          return post.id !== action.id;
        }),
      };
    default:
      return state;
  }
  /* if (action.type === ADD_POST) {
    return {
      posts: [...state.posts, action.payload],
    };
  } else if (action.type === REMOVE_POST) {
    return {
      posts: state.posts.filter((post) => {
        return post.id !== action.id;
      }),
    };
  } else {
    return state;
  } */
};

const userReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

//root reducer
const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});

//store
const store = createStore(rootReducer);

//subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log("posts", data.posts);
  console.log("users", data.users);
});
//dispatch
store.dispatch(addPostAction({ id: 1, title: "Muddassir" }));
store.dispatch(
  addPostAction({
    id: 2,
    title: "Sarfaraz",
  })
);

store.dispatch(removePostAction(2));
store.dispatch(
  addUserAction({ name: "Sarfaraz", email: "sarfaraz@gmail.com" })
);
