import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        themeColour: 'light',
    },
    reducers: {
        toDark(state, action) {
            state.themeColour = action.payload;
        },
        toLight(state) {
            state.themeColour = 'light';
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;