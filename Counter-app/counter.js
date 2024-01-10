//steps
const { createStore } = require("redux");
//Initial state
const initialState = {
  count: 0,
};
//actions (action, action creator)
//increment
//decrement
//reset
//increaseByAmount
//action
//Action creator
const incrementAction = () => {
  return {
    type: "INCREMENT",
  };
};

const decrementAction = () => {
  return {
    type: "DECREMENT",
  };
};

const resetAction = () => {
  return {
    type: "RESET",
  };
};

const incrementByAmtAction = (anyAmount) => {
  return {
    type: "INCREMENT_BY_AMT",
    payload: anyAmount,
  };
};

//reducers
const counterReducer = (state = initialState, action) => {
  // console.log(action);
  if (action.type === "INCREMENT") {
    return {
      count: state.count + 1,
    };
  } else if (action.type === "DECREMENT") {
    return {
      count: state.count - 1,
    };
  } else if (action.type === "RESET") {
    return {
      count: 0,
    };
  } else if (action.type === "INCREMENT_BY_AMT") {
    return {
      count: state.count + action.payload,
    };
  }
};

//store
const store = createStore(counterReducer);

//subscribe to store
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

//dispatch action
store.dispatch(incrementAction());
store.dispatch(decrementAction());
store.dispatch(resetAction());

//dispatch action with payload
store.dispatch(incrementByAmtAction(10));
