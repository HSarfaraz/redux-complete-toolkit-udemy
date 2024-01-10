import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
  transactions: [],
  transaction: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
};

//account to create transaction
export const createTransactionAction = createAsyncThunk(
  "transaction/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, account, transactionType, amount, category, notes } = payload;
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the request
      const res = await axios.post(
        `${baseURL}/transactions`,
        {
          name,
          account,
          transactionType,
          amount,
          category,
          notes,
          account: payload.id,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//account to update transaction
export const updateTransactionAction = createAsyncThunk(
  "transaction/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, account, transactionType, amount, category, notes, id } =
      payload;
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the request
      const res = await axios.put(
        `${baseURL}/transactions/${id}`,
        {
          name,
          account,
          transactionType,
          amount,
          category,
          notes,
          id,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get transaction
export const getTransactionAction = createAsyncThunk(
  "transaction/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //Get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      /* ?. called as optional chaining */
      //pass the token to header
      //headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the request
      const res = await axios.get(`${baseURL}/transactions/${id}`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create Transaction slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    //create transaction
    builder.addCase(createTransactionAction.pending, (state, action) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(createTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.transaction = action.payload;
    });
    //rejected
    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.transaction = null;
      state.error = action.payload;
    });

    //update transaction
    builder.addCase(updateTransactionAction.pending, (state, action) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(updateTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.transaction = action.payload;
    });
    //rejected
    builder.addCase(updateTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.transaction = null;
      state.error = action.payload;
    });

    //get transaction
    builder.addCase(getTransactionAction.pending, (state, action) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(getTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });
    //rejected
    builder.addCase(getTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = null;
      state.error = action.payload;
    });
  },
});

//generate reducer
const transactionsReducer = transactionSlice.reducer;
export default transactionsReducer;
