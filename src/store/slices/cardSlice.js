/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCard = createAsyncThunk("card/fetchCard", async (url) => {
  const result = await fetch(url).then((o) => o.json());
  return result;
});

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    product: null,
    status: "loading",
    error: null,
  },
  extraReducers: {
    [fetchCard.pending]: (state) => {
      state.error = null;
    },
    [fetchCard.fulfilled]: (state, action) => {
      state.status = null;
      state.product = action.payload;
    },
    [fetchCard.rejected]: (state) => {
      state.status = null;
      state.error = new Error("При загрузке возникла ошибка");
    },
  },
});

export default cardSlice.reducer;
