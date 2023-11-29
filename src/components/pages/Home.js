import React from "react";

import ExpenseList from "../expenses/ExpenseList";
import AddExpense from "../expenses/AddExpense";
import { useState } from "react";

const Home = (props) => {
  const [expenseList, setExpenseList] = useState([]);

  const addExpenseHandler = (eAmount, eDescription, eCategory) => {
    setExpenseList((prevExpenseList) => {
      return [
        ...prevExpenseList,
        {
          amount: eAmount,
          description: eDescription,
          category: eCategory,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
    <>
      <AddExpense onAddExpense={addExpenseHandler} />
      <ExpenseList expenses={expenseList} />
    </>
  );
};

export default Home;
