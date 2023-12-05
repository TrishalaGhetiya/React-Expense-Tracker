import { deleteExpense } from "../slices/expense-slice";

export const deleteExpenseAction = (id) => {
  return async (dispatch, getState) => {
    try {
        const response = await fetch(
          `https://react-http-ff156-default-rtdb.firebaseio.com/expenses/${id}.json`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        console.log(data);
        dispatch(deleteExpense(data));
      } catch (err) {
        console.log(err);
      }
  };
};
