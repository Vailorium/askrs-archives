/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IHeroBuild from '../interfaces/IHeroBuild';

function getCookie(name: string) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
}

export const MyBuildsAPI = createApi({
  reducerPath: 'MyBuildsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({
      'x-csrf-token': getCookie('csrfToken') || '',
    }),
  }),
  endpoints: (builder) => ({
    getMyBuilds: builder.query<IHeroBuild[], void>({
      query: () => 'builds',
    }),
  }),
});

export const { useGetMyBuildsQuery } = MyBuildsAPI;
