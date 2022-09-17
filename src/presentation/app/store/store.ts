import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../Auth/store/auth.slice";
import { groupSlice } from "../ExpensesManager/store/group.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
