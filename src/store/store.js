import { configureStore } from "@reduxjs/toolkit";
import searchSliceReducer  from "./slices/searchSlice";
import catalogListSliceReducer from "./slices/catalogListSlice";
import categoriesSliceReducer from "./slices/categoriesSlice";

const store = configureStore({
    reducer: {
        catalogList: catalogListSliceReducer,
        searchInput: searchSliceReducer,
        categories: categoriesSliceReducer,
    }
})

export default store;