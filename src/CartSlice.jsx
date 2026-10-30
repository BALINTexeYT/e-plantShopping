import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const { id, name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.id === id || item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload && item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id || item.name === name);

      if (itemToUpdate && quantity > 0) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
