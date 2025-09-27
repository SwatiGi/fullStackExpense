// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { authActions } from "./auth"


const store = configureStore({
  reducer: authActions,
  
});

export default store;
