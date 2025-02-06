import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todo";
export const store = configureStore({
    reducer :{
        todo : todoReducer,
    }
})