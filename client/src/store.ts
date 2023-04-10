/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FEHDataAPI } from './services/FEHDataApi';
import { FEHLocaleAPI } from './services/FEHLocaleApi';
import { MyBuildsAPI } from './services/MyBuildsApi';
import { UserProfileAPI } from './services/UserProfileApi';
import unitBuilderActiveBuildsReducer from './services/UnitBuilderActiveBuildsSlice';

// eslint-disable-next-line max-len
export const store = configureStore({
  reducer: {
    [FEHDataAPI.reducerPath]: FEHDataAPI.reducer,
    [FEHLocaleAPI.reducerPath]: FEHLocaleAPI.reducer,
    [MyBuildsAPI.reducerPath]: MyBuildsAPI.reducer,
    [UserProfileAPI.reducerPath]: UserProfileAPI.reducer,
    unitBuilderActiveBuilds: unitBuilderActiveBuildsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      FEHDataAPI.middleware,
      FEHLocaleAPI.middleware,
      MyBuildsAPI.middleware,
      UserProfileAPI.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
setupListeners(store.dispatch);
