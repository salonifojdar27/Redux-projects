import { configureStore } from "@reduxjs/toolkit";
import idCardReducer from "../features/idcardSlice";

export const store = configureStore({
  reducer: {
    idCards: idCardReducer
  }
});
