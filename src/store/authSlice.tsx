import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { UserProfile } from "../api/types";

interface AuthState {
  isUser: boolean;
  user: UserProfile | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isUser: false,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.isUser = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isUser = false;
      state.user = null;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export const selectIsUser = (state: RootState) => state.auth.isUser;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
