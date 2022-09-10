import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchInput",
  initialState: {
    searchValue: "",
  },
  reducers: {
    changeSearchValue: (state, action) => {
      console.log(action.payload)
      state.searchValue = action.payload;
    },
  },
  
});

export const { changeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;