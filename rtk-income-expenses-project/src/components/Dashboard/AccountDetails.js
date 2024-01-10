import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TransactionList from "./TransactionList";
import { getSingleAccountAction } from "../../redux/slice/accounts/accountSlice";
import { useDispatch, useSelector } from "react-redux";

const AccountDetails = () => {
  //get Id
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleAccountAction(id));
  }, [id]);

  //get the data from store
  const { account, error, loading } = useSelector((state) => state?.accounts);
  //get all transactions
  //filter the transaction based on specific type
  /* const qtys = [1, 2, 3, 1, 2, 2, 2, 3, 4];
  const filteredQty = qtys
    .filter((qty) => {
      return qty <= 2;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
 */

  const transactions = account?.data?.transactions || [];
  // calculate the total income
  const totalIncome = transactions
    ?.filter((transaction) => transaction.transactionType === "Income")
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  console.log(totalIncome);

  //calculate total expenses
  const totalExpenses = transactions
    ?.filter((transaction) => transaction.transactionType === "Expenses")
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  //total balance
  const totalBalance = totalIncome - totalExpenses;
  console.log(totalBalance);

  return (
    <>
      {error && <h2 className="text-center text-red-700 mt-3">{error}</h2>}
      {loading && (
        <h2 className="text-center text-red-700 mt-3 text-3xl">Loading...</h2>
      )}
      {/* Account Summary */}
      <section
        className="py-20 xl:pt-24 xl:pb-32 bg-white"
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundPosition: "center",
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
              Your Initial Balance is: ${account?.data?.initialBalance}
            </span>
            <h3 className="mb-4 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
              {account?.data?.name}
            </h3>
            <p className=" mx-auto mb-8 text-lg md:text-xl text-coolGray-500 font-medium max-w-4xl">
              {account?.data?.notes}
            </p>
            <Link
              to={`/edit-account/${account?.data?._id}`}
              className="inline-flex text-center  mb-8 items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit Account
            </Link>
            <div className="flex flex-wrap justify-center -mx-4">
              <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
                <h2 className="mb-2 text-4xl md:text-5xl text-red-600 font-bold tracking-tighter">
                  $900
                </h2>
                <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                  Expenses
                </p>
              </div>
              <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
                <h2 className="mb-2 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                  $30.000
                </h2>
                <p className="text-lg md:text-xl text-green-500 font-medium">
                  Income
                </p>
              </div>
              <div className="w-full md:w-1/3 lg:w-1/4 px-4">
                <h2 className="mb-2 text-4xl md:text-5xl text-coolGray-900 font-bold tracking-tighter">
                  $ 500
                </h2>
                <p className="text-lg md:text-xl text-blue-500 font-medium">
                  Balance
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-center items-center text-center">
              <Link
                to={`/add-transaction/${account?.data?._id}`}
                type="button"
                className="inline-flex text-center items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add New Transaction
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transactions */}
      {transactions.length <= 0 ? (
        <h2 className="text-center text-indigo-600 mb-5 text-2xl">
          No Transactions found
        </h2>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </>
  );
};

export default AccountDetails;
