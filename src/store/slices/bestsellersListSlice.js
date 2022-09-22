/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBestsellers = createAsyncThunk(
  'bestsellersList/fetchBestsellers',
  async (url) => {
    const result = await fetch(url).then((o) => o.json());
    return result;
  },
);

export const bestsellersListSlice = createSlice({
  name: 'bestsellersList',
  initialState: {
    list: [],
    status: 'loading',
    error: null,
  },
  extraReducers: {
    [fetchBestsellers.pending]: (state) => {
      state.error = null;
    },
    [fetchBestsellers.fulfilled]: (state, action) => {
      state.status = null;
      state.error = null;
      state.bestsellersList = action.payload;
    },
    [fetchBestsellers.rejected]: (state) => {
      state.error = new Error('При загрузке возникла ошибка');
    },
  },
});

export default bestsellersListSlice.reducer;
