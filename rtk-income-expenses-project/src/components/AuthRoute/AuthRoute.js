import React from "react";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  //get the token from store
  const { userInfo } = useSelector((state) => state?.users?.userAuth);
  //check if not token available then redirect
  if (!userInfo?.token) {
    window.location.href = "/login";
  }
  return <div>{children}</div>;
};

export default AuthRoute;
