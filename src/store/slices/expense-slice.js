import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    items: [],
    totalExpenses: 0,
    changed: false,
  },
  reducers: {
    replaceExpenses(state, action) {
      state.totalExpenses = action.payload.totalExpenses;
      state.items = action.payload.items;
      state.changed = false;
    },
    addExpenses(state, action) {
      state.items.push(action.payload);
      state.totalExpenses = state.totalExpenses + +action.payload.amount;
      state.changed = true;
    },
    deleteExpense(state, action) {
      console.log(action.payload);
      const id = action.payload.id;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalExpenses = state.totalExpenses - action.payload.amount;
      state.changed = true;
    },
  },
});

export const { replaceExpenses, addExpenses, deleteExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
