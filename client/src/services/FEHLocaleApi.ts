/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FEHLocaleAPI = createApi({
  reducerPath: 'FEHLocaleAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CDN_URL,
    mode: 'cors',
  }),
  endpoints: (builder) => ({
    getLocaleData: builder.query<Record<string, string>, string>({
      query: (localeID) => `data/locales/locale_${localeID}.json`,
    }),
  }),
});

export const { useGetLocaleDataQuery } = FEHLocaleAPI;
