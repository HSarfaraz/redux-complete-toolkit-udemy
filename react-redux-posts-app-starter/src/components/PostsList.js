import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPost from "./SearchPost";
import "./Posts.css";
import { fetchPostsAction } from "../redux/actions/postActions";

const PostsList = () => {
  //dispatch
  const dispatch = useDispatch();
  useDispatch(() => {
    dispatch(fetchPostsAction())
  }, []);

  //get data from store
  // const useSelector((data)=>{data})
  return (
    <>
      <SearchPost />
      <div className="posts-list">
        <h1>Total Posts 100</h1>
        <div className="post-details">
          <h3>Post Title 1</h3>
          <p>Post body 1</p>
        </div>
      </div>
    </>
  );
};

export default PostsList;
