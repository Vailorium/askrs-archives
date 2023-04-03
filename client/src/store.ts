/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FEHDataAPI } from './services/FEHDataApi';
import { FEHLocaleAPI } from './services/FEHLocaleApi';
import userReducer from './services/UserSlice';

// eslint-disable-next-line max-len
export const store = configureStore({
  reducer: {
    [FEHDataAPI.reducerPath]: FEHDataAPI.reducer,
    [FEHLocaleAPI.reducerPath]: FEHLocaleAPI.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FEHDataAPI.middleware, FEHLocaleAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
