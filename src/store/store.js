import { configureStore } from "@reduxjs/toolkit";
import searchSliceReducer from "./slices/searchSlice";
import  catalogListSliceReducer from "./slices/catalogListSlice";

const store = configureStore({
    reducer: {
        catalogList: catalogListSliceReducer,
        searchInput: searchSliceReducer
    }
})

export default store;