import { createSlice } from "@reduxjs/toolkit";

import { Nullable } from "../../../../domain/Shared/types/Nullable.type";
import { User } from "../../../../domain/User/User.model";

export interface AuthState {
  user: Nullable<User>;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: { payload: User }) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
