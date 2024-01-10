import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
  users: [],
  user: {},
  profile: {},
  loading: false,
  error: null,
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//action creator
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${baseURL}/users/register`,
        {
          fullname,
          email,
          password,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${baseURL}/users/login`,
        {
          email,
          password,
        },
        config
      );
      //save the data in local
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUserAction = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");
  return null;
});

export const getProfileAction = createAsyncThunk(
  "user/getProfile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
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
      const res = await axios.get(`${baseURL}/users/profile`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

//create slice
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //register
    //pending
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    //rejected
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });

    //login
    //pending
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    //rejected
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });

    //logout
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = null;
    });

    //profile
    //pending
    builder.addCase(getProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    //rejected
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = "";
    });
  },
});
//reducer
const usersReducer = userSlice.reducer;
export default usersReducer;
