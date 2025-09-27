
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: false,
  token: null,
  userEmail: null,
    userUID: null,
  
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.userUID = action.payload.uid;
    },
    logout(state) {
      state.isAuth = false;
      state.token = null;
      state.userEmail = null;
      state.userUID = null;
      },
     
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
