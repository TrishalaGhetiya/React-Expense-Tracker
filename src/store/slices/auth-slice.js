import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    token: "",
    userName: "",
  },
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.isLoggedIn = !!state.token;
      state.token = localStorage.getItem("token");
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem('userName', action.payload.userName);
      state.userName = action.payload.userName;
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = !!state.token;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
