import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const userData =
                action.payload && typeof action.payload === "object" && "userData" in action.payload
                    ? action.payload.userData
                    : action.payload ?? null;

            state.status = Boolean(userData);
            state.userData = userData;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;