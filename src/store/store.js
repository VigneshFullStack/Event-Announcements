import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import newsSlice from './newsSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        news: newsSlice,
    }
});

export default store;
