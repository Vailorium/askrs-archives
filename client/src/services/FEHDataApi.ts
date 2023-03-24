/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HeroDataModel, SkillDataModel } from '../models';

export const FEHDataAPI = createApi({
  reducerPath: 'FEHDataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CDN_URL,
    mode: 'cors',
  }),
  endpoints: (builder) => ({
    fetchHeroList: builder.query<HeroDataModel[], void>({
      query: () => 'data/heroes/hero_list.json',
    }),

    fetchResplendentList: builder.query<string[], void>({
      query: () => 'data/heroes/resplendent_list.json',
    }),

    fetchSkillList: builder.query<SkillDataModel[], void>({
      query: () => 'data/skills/skill_list.json',
    }),

    fetchSealList: builder.query<string[], void>({
      query: () => 'data/skills/seal_list.json',
    }),
  }),
});

export const {
  useFetchHeroListQuery, useFetchResplendentListQuery, useFetchSkillListQuery, useFetchSealListQuery,
} = FEHDataAPI;
