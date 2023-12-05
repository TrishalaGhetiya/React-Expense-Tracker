import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    totalExpenses: 0,
    loading: false,
    error: null,
  },
  reducers: {
    fetchExpenses(state, action) {
      state.expenses = action.payload;
      for(let i=0;i<action.payload.length;i++){
        state.totalExpenses += +action.payload[i].amount;
      }
    },
    addExpenses(state, action) {
      state.expenses = state.expenses.push(action.payload);
      state.totalExpenses = state.totalExpenses + action.payload.amount;
    },
    deleteExpense(state, action) {
      state.totalExpenses = state.totalExpenses - action.payload.amount;
    }
  }
  },
);

export const {fetchExpenses, addExpenses, deleteExpense} = expenseSlice.actions;

export default expenseSlice.reducer;
