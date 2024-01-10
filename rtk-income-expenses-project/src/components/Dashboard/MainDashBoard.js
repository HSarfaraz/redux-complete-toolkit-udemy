import React, { useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/userSlice";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const { profile, error, loading } = useSelector((state) => state.users);
  console.log(profile);
  return (
    <>
      {loading ? (
        <h2 className="text-center text-green-600 mt-5 text-lg">Loading...</h2>
      ) : error ? (
        <h2 className="text-center text-red-600 mt-5 text-lg">{error}</h2>
      ) : (
        <>
          {/* here profile contain the account and transactions */}
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
