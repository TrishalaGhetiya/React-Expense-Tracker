import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice";
import expenseReducer from './slices/expense-slice';
import themeReducer from './slices/theme-slice';

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer },
});

export default store;
