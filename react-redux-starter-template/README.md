## Setting Up Redux for react

1. Install these dependecies

1. redux
1. react-redux
1. redux-devtools-extension

npm i redux react-redux
npm i redux-devtools-extension

## Create an action

```js
//ADD_EXPENSE ACTION
export const addExpense = ({
  description = "",
  notes = "",
  amount = 0,
  createdAt = 0,
} = {}) => {
  return {
    type: "ADD_EXPENSE",
    payload: {
      id: uuid(),
      description,
      notes,
      amount,
      createdAt,
    },
  };
};
```

## Create a reducer

```js
//Expenses Reducers

const expensesDefaultState = [];
const expenseReducer = (state = expensesDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.payload];

    case "REMOVE_EXPENSE":
      return state.filter((exp) => exp.id !== action.payload.id);
    default:
      return state;
  }
};

export default expenseReducer;
```

## Create root reducer

```js
import { combineReducers } from "redux";
import expensesReducer from "./expenses-reducers";
import filterReducer from "./filters-reducers";

const rootReducer = combineReducers({
  expenses: expensesReducer,
  filters: filterReducer,
});

export default rootReducer;
```

## Create a store

1. Here you will import any middleware you want to pass to your store for example redux dev tool or redux-thunk

```js
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root-reducers";

import { composeWithDevTools } from "redux-devtools-extension";

//STORE

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export default store;
```

## Connecting redux to our app

```js
import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Welcome to react redux start up template</h1>
      </div>
    </Provider>
  );
}

export default App;
```
