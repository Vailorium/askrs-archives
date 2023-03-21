/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HeroDataModel, SkillDataModel } from '../models';

export const FEHDataAPI = createApi({
  reducerPath: 'FEHDataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      headers.set('Cache-Control', 'no-cache, max-age=2628000');
    },
  }),
  endpoints: (builder) => ({
    getGameData: builder.query<{ heroList: HeroDataModel[], skillList: SkillDataModel[], resplendentList: string[], sealList: string[] }, null>({
      query: () => 'api/data',
    }),
  }),
});

export const { useGetGameDataQuery } = FEHDataAPI;
