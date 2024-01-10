import {
  configureStore,
  createAsyncThunk,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";
import apiURL from "../../utils/apiURL";
import axios from "axios";

//initial state
const initialState = {
  posts: [],
  loading: false,
  error: "",
};

//action for all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.get(apiURL);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.status);
    }
  }
);

//action for getting single post
export const searchPost = createAsyncThunk(
  "post/search",
  async (id, { rejectWithValue, getState, dispatch }) => {
    console.log(id);
    try {
      const res = await axios.get(`${apiURL}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.status);
    }
  }
);

//slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    //pending
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
    });

    //fulfilled
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    //rejected
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.payload;
    });

    //search post

    //pending
    builder.addCase(searchPost.pending, (state, action) => {
      state.loading = true;
    });

    //fulfilled
    builder.addCase(searchPost.fulfilled, (state, action) => {
      state.posts = [action.payload];
      state.loading = false;
    });

    //rejected
    builder.addCase(searchPost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.payload;
    });
  },
});

//reducer
const postsReducer = postSlice.reducer;

export default postsReducer;
