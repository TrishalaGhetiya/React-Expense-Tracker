import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || null;
const authSlice = createSlice({
  name: "authentication",
  initialState: {
    token,
    isLoggedIn: !!token,
    userName: localStorage.getItem("userName") || null,
    isPremium: localStorage.getItem("premium") || false,
  },
  reducers: {
    login(state, action) {
      console.log(action.payload);
      localStorage.clear();
      state.isLoggedIn = !!state.token;
      state.token = localStorage.getItem("token");
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.userName);
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = !!state.token;
      localStorage.clear();
    },
    updateProfile(state, action) {
      state.userName = action.payload;
      localStorage.setItem("userName", action.payload);
    },
    setPremium(state, action) {
      state.isPremium = true;
      localStorage.setItem("premium", true);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
