import { configureStore } from "@reduxjs/toolkit";
import  catalogListSliceReducer from "./slices/catalogListSlice";

const store = configureStore({
    reducer: {
        catalogList: catalogListSliceReducer,
    }
})

export default store;