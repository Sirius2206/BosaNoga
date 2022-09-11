import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const {product, selectedSize, quantity} = action.payload;
      let result = state.cart.find(o => o.id === product.id);
      if (result) {
        result.quantity = (result.quantity + quantity) > 10 ? 10 : (result.quantity + quantity);
        return;
      }
      result = {product: product,
                size: selectedSize,
                quantity: quantity}
      state.cart = [...state.cart, result];
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter(o => o.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
},
);

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;