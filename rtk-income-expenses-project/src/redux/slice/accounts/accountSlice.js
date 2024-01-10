import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
  accounts: [],
  account: {},
  loading: false,
  success: false,
  error: null,
  isUpdated: false,
};

//action creator
export const createAccountAction = createAsyncThunk(
  "account/create",
  async (
    { name, accountType, initialBalance, notes },
    { rejectWithValue, getState, dispatch }
  ) => {
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
      const res = await axios.post(
        `${baseURL}/accounts`,
        { name, accountType, initialBalance, notes },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update account
export const updateAccountAction = createAsyncThunk(
  "account/update",
  async (
    { name, accountType, initialBalance, notes, id },
    { rejectWithValue, getState, dispatch }
  ) => {
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
      const res = await axios.put(
        `${baseURL}/accounts/${id}`,
        { name, accountType, initialBalance, notes },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get single account
export const getSingleAccountAction = createAsyncThunk(
  "account/get-details",
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
      const res = await axios.get(`${baseURL}/accounts/${id}`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create slice
const accountsSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //create account
    //pending
    builder.addCase(createAccountAction.pending, (state) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = action.payload;
    });
    //rejected
    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.account = "";
    });

    //get single account
    //pending
    builder.addCase(getSingleAccountAction.pending, (state) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = action.payload;
    });
    //rejected
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.account = "";
    });

    //

    //update account
    //pending
    builder.addCase(updateAccountAction.pending, (state) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = false;
      state.isUpdated = true;
      state.account = action.payload;
    });
    //rejected
    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.isUpdated = false;
      state.error = action.payload;
      state.account = "";
    });
  },
});
//reducer
const accountsReducer = accountsSlice.reducer;
export default accountsReducer;
