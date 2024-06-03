import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    loginError: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;
            if (email === 'vignesh.venkatesan@euroland.com' && password === '123') {
                state.isAuthenticated = true;
                state.loginError = null;
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
            } else {
                state.isAuthenticated = false;
                state.loginError = 'Invalid email or password';
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.loginError = null;
            localStorage.setItem('isAuthenticated', JSON.stringify(false));
        },
        clearError: (state) => {
            state.loginError = null;
        }
    }
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
