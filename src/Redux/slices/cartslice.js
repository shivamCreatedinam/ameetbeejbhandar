import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { id, variantId } = action.payload; // Assuming payload has id and variantId
      const existingItem = state.items.find(
          (item) => item.id === id && item.variantId === variantId // Check both IDs
      );
      if (existingItem) {
          existingItem.quantity += 1; // Increase quantity if it exists
      } else {
          state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
  },
  incrementQuantity: (state, action) => {
    const { id, variantId } = action.payload; 
    const item = state.items.find(item => item.id === id && item.variantId === variantId);
    if (item) {
      item.quantity += 1;
    }
  },
  decrementQuantity: (state, action) => {
    const { id, variantId } = action.payload; 
    const item = state.items.find(item => item.id === id && item.variantId === variantId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else if (item && item.quantity === 1) {
      state.items = state.items.filter(item => !(item.id === id && item.variantId === variantId));
    }
  },
  updateQuantity: (state, action) => {
    const { id, variantId, quantity } = action.payload; 
    const item = state.items.find(item => item.id === id && item.variantId === variantId);
    if (item) {
      if (quantity === 0) {
        state.items = state.items.filter(item => !(item.id === id && item.variantId === variantId));
      } else {
        item.quantity = quantity;
      }
    }
  },  
  },
});

export const {
  addItemToCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
