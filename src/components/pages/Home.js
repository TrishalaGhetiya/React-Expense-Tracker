import React from "react";

import ExpenseList from "../expenses/ExpenseList";
import AddExpense from "../expenses/AddExpense";
import { useState } from "react";
import { useEffect } from "react";

const Home = (props) => {
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://react-http-ff156-default-rtdb.firebaseio.com/expenses.json"
        );
        const data = await response.json();
        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setExpenseList(loadedExpenses);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const addExpenseHandler = async (expense) => {
    try {
      const response = await fetch(
        "https://react-http-ff156-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-http-ff156-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const editExpenseHandler = async (expense) => {

    try {
      const response = await fetch(
        `https://react-http-ff156-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(expense)
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AddExpense onAddExpense={addExpenseHandler} />
      <ExpenseList
        expenses={expenseList}
        onDelete={deleteExpenseHandler}
        onEdit={editExpenseHandler}
      />
    </>
  );
};

export default Home;
