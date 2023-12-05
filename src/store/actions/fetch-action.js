import { fetchExpenses } from "../slices/expense-slice";

export const fetchExpenseAction = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        "https://react-http-ff156-default-rtdb.firebaseio.com/expenses.json"
      );
      const data = await response.json();

      const dataArray = [];
      for (const [key, value] of Object.entries(data)) {
        dataArray.push({ id: key, ...value });
      }
      //console.log(dataArray);
      dispatch(fetchExpenses(dataArray));
    } catch (err) {
      return err.message;
    }
  };
};
