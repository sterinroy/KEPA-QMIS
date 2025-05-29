// src/pages/QM/purchaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showDropdown: false,
  penNumber: 'PEN123456',
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    toggleDropdown(state) {
      state.showDropdown = !state.showDropdown;
    },
    setDropdown(state, action) {
      state.showDropdown = action.payload;
    },
    clearState(state) {
      state.showDropdown = false;
    },
  },
});

export const { toggleDropdown, setDropdown, clearState } = purchaseSlice.actions;
export default purchaseSlice.reducer;
