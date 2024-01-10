const { createSlice, configureStore } = require("@reduxjs/toolkit");

//Initial state
const initialState = {
  counter: 0,
};

//createSlice
const counterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.counter += 1;
    },
    decrement: (state, action) => {
      state.counter -= 1;
    },
    reset: (state, action) => {
      state.counter = 0;
    },
    incrementByAmount: (state, action) => {
      state.counter += action.payload;
    },
  },
});

//create Action
const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

//create reducer
const counterReducer = counterSlice.reducer;

const store = configureStore({
  reducer: counterReducer,
});

store.dispatch(increment());
store.dispatch(reset());
store.dispatch(incrementByAmount(20));
store.dispatch(decrement());

console.log(store.getState());
