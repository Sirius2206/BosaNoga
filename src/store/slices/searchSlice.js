/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

//Слайс для значения поиска.
export const searchSlice = createSlice({
  name: 'searchInput',
  initialState: {
    searchValue: '',
  },
  reducers: {
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { changeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
