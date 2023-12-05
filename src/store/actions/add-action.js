import { addExpenses } from "../slices/expense-slice";

export const addExpenseAction = (expense) => {
  return async (dispatch, getState) => {
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
        dispatch(addExpenses(data));
      } catch (err) {
        return err.message;
      }
  };
};
