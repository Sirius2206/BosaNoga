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

//Слайс для выбора категории в каталоге
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesList: [],
    currentCategory: 0,
    status: 'loading',
    error: null,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = null;
      state.error = null;
      state.categoriesList = action.payload;
    },
    [fetchCategories.rejected]: (state) => {
      state.error = new Error('При загрузке категорий возникла ошибка');
    },
  },
});

export const { changeCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
