import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: 'light',
    },
    reducers: {
        toDark(state, action) {
            state.mode = 'dark';
        },
        toLight(state) {
            state.mode = 'light';
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;