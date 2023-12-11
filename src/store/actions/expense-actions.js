import axios from "axios";
import { replaceExpenses } from "../slices/expense-slice";
const userName = localStorage.getItem('userName');
export const sendExpenses = (expense, userName) => {
  console.log(userName);
  const finalExpense = {items: expense.items, totalExpenses: expense.totalExpenses}
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.put(
        `https://react-http-ff156-default-rtdb.firebaseio.com/expenses/${userName}.json`, finalExpense);
      if (response.statusText !== 'OK') {
        throw new Error("Sending expenses failed");
      }
    };
    try {
      await sendRequest();
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getExpenses = () => {
  return async (dispatch) => {
    const fetchExpenses = async () => {
      const response = await axios.get(
        `https://react-http-ff156-default-rtdb.firebaseio.com/expenses/${userName}.json`
      );
      if (response.statusText !== 'OK') {
        throw new Error("Could not fetch expenses");
      }
      return response.data;
    };
    try {
      const data = await fetchExpenses();
      dispatch(replaceExpenses(data));
    } catch (err) {
      console.log(err.message);
    }
  };
};
