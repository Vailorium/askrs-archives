/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Dictionary } from '../models';

export const FEHLocaleAPI = createApi({
  reducerPath: 'FEHLocaleAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      headers.set('Cache-Control', 'no-cache, max-age=2628000');
    },
  }),
  endpoints: (builder) => ({
    getLocaleData: builder.query<Dictionary<string | null>, string>({
      query: (localeID) => `api/locale/${localeID}`,
    }),
  }),
});

export const { useGetLocaleDataQuery } = FEHLocaleAPI;
