/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (url) => {
    const result = await fetch(url).then((o) => o.json());
    return result;
  },
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesList: [],
    currentCategory: 0,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = null;
      state.categoriesList = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {},
  },
});

export const { changeCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
