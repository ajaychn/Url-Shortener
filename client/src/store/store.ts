import { configureStore } from "@reduxjs/toolkit";
import { urlApi } from "../services/urlApi";
import { authApi } from "../services/authApi";

export const store = configureStore({
  reducer:{
    [urlApi.reducerPath]: urlApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware:(getDefaultMiddleware)=> getDefaultMiddleware()
  .concat(urlApi.middleware)
  .concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
