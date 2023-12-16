import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, reposReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    repos: reposReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
