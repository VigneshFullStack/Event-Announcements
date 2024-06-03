import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        loginError: null
    },
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;
            if (email === 'vignesh.venkatesan@euroland.com' && password === '123') {
                state.isAuthenticated = true;
                state.loginError = null;
            } else {
                state.isAuthenticated = false;
                state.loginError = 'Invalid email or password';
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.loginError = null;
        },
        clearError: (state) => {
            state.loginError = null;
        }
    }
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
