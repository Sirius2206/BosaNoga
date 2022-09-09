import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCatalog = createAsyncThunk(
  "catalogList/fetchCatalog",
  async function (url) {
    const result = await fetch(url).then(result => result.json());
    return result;
  }
)
export const loadMore = createAsyncThunk(
  "catalogList/loadMore",
  async function (url) {
    const result = await fetch(url).then(result => result.json());
    return result;
  }
)

export const catalogListSlice = createSlice({
  name: "catalogList",
  initialState: {
    list: [],
    status: null,
    error: null,
    currentCategory: "http://localhost:7070/api/items"
  },
  reducers: {
    changeCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: {
    [fetchCatalog.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCatalog.fulfilled]: (state, action) => {
      state.status = null;
      state.list = action.payload;
    },
    [fetchCatalog.rejected]: (state, action) => {},
    [loadMore.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [loadMore.fulfilled]: (state, action) => {
      state.status = null;
      state.list = [...state.list, ...action.payload];
    },
    [loadMore.rejected]: (state, action) => {},
  }
});

export const { changeCategory,reloadList } = catalogListSlice.actions;

export default catalogListSlice.reducer;