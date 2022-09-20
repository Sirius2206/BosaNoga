import { configureStore } from '@reduxjs/toolkit';
import searchSliceReducer from './slices/searchSlice';
import bestsellersListReducer from './slices/bestsellersListSlice';
import catalogListSliceReducer from './slices/catalogListSlice';
import categoriesSliceReducer from './slices/categoriesSlice';
import cartSliceReducer from './slices/cartSlice';
import cardSliceReducer from './slices/cardSlice';

const store = configureStore({
  reducer: {
    bestsellersList: bestsellersListReducer,
    catalogList: catalogListSliceReducer,
    searchInput: searchSliceReducer,
    categories: categoriesSliceReducer,
    cart: cartSliceReducer,
    card: cardSliceReducer,
  },
});

export default store;
