// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import purchaseReducer from './pages/QM/purchaseSlice'; // adjust path if needed

export const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
  },
});
