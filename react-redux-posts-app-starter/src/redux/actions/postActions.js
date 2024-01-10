import axios from "axios";

import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  SEARCH_POST_FAILURE,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
} from "./postActionTypes";

const apiURL = "https://jsonplaceholder.typicode.com/posts";

//Actions creators
//1. fetch posts (request status, success, error)
//request started: main purpose to change to true
const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

//Success
const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

//error action creator
const fetchPostsError = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error,
  };
};

//fetch post action
export const fetchPostsAction = () => {
  return async (dispatch) => {
    //request action
    dispatch(fetchPostsRequest());
    try {
      //make http request
      const res = await axios.get(apiURL);

      //success action
      dispatch(fetchPostsSuccess(res.data));
    } catch (error) {
      //error action
      dispatch(fetchPostsError());
    }
  };
};

//2. fetch post (request status, success, error)

//request action
const fetchPostRequest = () => {
  return {
    type: SEARCH_POST_REQUEST,
  };
};

const fetchPostSuccess = (post) => {
  return {
    type: SEARCH_POST_SUCCESS,
    payload: post,
  };
};

const fetchPostError = (error) => {
  return {
    type: SEARCH_POST_FAILURE,
    payload: error,
  };
};
//Single post action
export const fetchPostAction = () => {
  return async (dispatch) => {
    dispatch(fetchPostRequest());
    try {
      const res = await axios.get(`apiURL/${id}`);
      dispatch(fetchPostSuccess(res.data));
    } catch (error) {
      dispatch(fetchPostError(error));
    }
  };
};
