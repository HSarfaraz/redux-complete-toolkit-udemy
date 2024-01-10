import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/userSlice";
import accountsReducer from "../slice/accounts/accountSlice";
import transactionsReducer from "../slice/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
  },
});

export default store;
