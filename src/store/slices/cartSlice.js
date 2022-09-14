/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function addToLocalStorage(obj) {
  let prevLocStor = [];
  if (localStorage.getItem('BosaNogaCart')) {
    prevLocStor = JSON.parse(localStorage.getItem('BosaNogaCart'));
    prevLocStor = prevLocStor.filter((o) => o.id !== obj.id);
  }
  localStorage.setItem('BosaNogaCart', JSON.stringify([...prevLocStor, obj]));
}

export const restoreLocalStorage = createAsyncThunk(
  'cart/restoreLocalStorage',
  async (locStor) => {
    const {
      id, price, size, quantity,
    } = locStor;
    let priceChanged = false;
    const product = await fetch(
      `${process.env.REACT_APP_URL}/api/items/${id}`,
    ).then((result) => result.json());
    if (product.price !== price) priceChanged = true;
    const result = { product, size, quantity };
    return [result, priceChanged];
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    priceChanged: false,
  },
  reducers: {
    addProduct: (state, action) => {
      const { product, selectedSize, quantity } = action.payload;
      let result = state.cart.find((o) => o.product.id === product.id);
      if (result) {
        result.quantity = result.quantity + quantity > 10 ? 10 : result.quantity + quantity;
        const locStorObj = {
          id: product.id,
          price: product.price,
          size: selectedSize,
          quantity: result.quantity,
        };
        addToLocalStorage(locStorObj);
        return;
      }
      result = {
        product,
        size: selectedSize,
        quantity,
      };
      state.cart = [...state.cart, result];
      const locStorObj = {
        id: product.id,
        price: product.price,
        size: selectedSize,
        quantity,
      };
      addToLocalStorage(locStorObj);
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((o) => o.product.id !== action.payload);
      localStorage.setItem('BosaNogaCart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      localStorage.removeItem('BosaNogaCart');
      state.cart = [];
    },
  },
  extraReducers: {
    [restoreLocalStorage.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [restoreLocalStorage.fulfilled]: (state, action) => {
      state.status = null;
      state.cart.push(action.payload[0]);
      state.priceChanged = action.payload[1];
    },
    [restoreLocalStorage.rejected]: (state, action) => {},
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
