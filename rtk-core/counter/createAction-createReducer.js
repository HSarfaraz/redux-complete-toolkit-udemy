const {
  createAction,
  nanoid,
  createReducer,
  configureStore,
} = require("@reduxjs/toolkit");

const logger = require("redux-logger").createLogger();

const initialState = {
  counter: 0,
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const INCREMENT_BY = "INCREMENT_BY";

// Create Action
const increment = createAction(INCREMENT);
const decrement = createAction(DECREMENT);
const resetCounter = createAction(RESET);
const incrementBy = createAction(INCREMENT_BY, (amount, user) => {
  return {
    payload: {
      amount,
      user,
      id: nanoid(),
    },
  };
});
console.log(incrementBy(20, "Muddasir"));

//Create Reducer
//1. Builder callback
//2. map object

//using Builder callback
const counterSlice = createReducer(initialState, (builder) => {
  //Increment
  builder.addCase(increment, (state) => {
    state.counter += 1;
  });
  //Decrement
  builder.addCase(decrement, (state) => {
    state.counter -= 1;
  });
  //Reset
  builder.addCase(resetCounter, (state) => {
    state.counter = 0;
  });
  //IncrementBy
  builder.addCase(incrementBy, (state, action) => {
    state.counter += action.payload.amount;
  });
});

//using map object
/* createAction(initialState, {
  [increment]: (state) => {
    state.counter += 1;
  },
  [decrement]: (state) => {
    state.counter -= 1;
  },
  [resetCounter]: (state) => {
    state.counter = 0;
  },
  [incrementBy]: (state, action) => {
    state.counter += action.payload.amount;
  },
}); */

//store
const store = configureStore({
  reducer: counterSlice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementBy(20));

console.log(store.getState());
