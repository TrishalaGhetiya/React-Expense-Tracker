import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async () => {
    try {
      const response = await fetch(
        "https://react-http-ff156-default-rtdb.firebaseio.com/expenses.json"
      );
      const data = await response.json();
      console.log(data);
      const dataArray = [];
      for (const [key, value] of Object.entries(data)) {
        dataArray.push({ id: key, ...value });
      }
      return dataArray;
    } catch (err) {
      return err.message;
    }
  }
);

export const addExpenses = createAsyncThunk(
  "expense/addExpenses",
  async (expense) => {
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
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id) => {
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
  }
);

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async (expense) => {
    try {
      const response = await fetch(
        `https://react-http-ff156-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
        {
          method: "PUT",
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
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = state.expenses.concat(action.payload);
      state.error = "";
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.expenses = [];
      state.error = action.error.message;
    });
    builder.addCase(addExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = state.expenses.push(action.payload);
      state.error = "";
    });
    builder.addCase(editExpense.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = "";
    });
  },
});

export default expenseSlice.reducer;
