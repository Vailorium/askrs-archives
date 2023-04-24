/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IUserInfo from '../interfaces/IUserInfo';

function getCookie(name: string) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
}

export const UserProfileAPI = createApi({
  reducerPath: 'UserProfileAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    mode: 'cors',
    credentials: 'include',
    headers: new Headers({
      'x-csrf-token': getCookie('csrfToken') || '',
    }),
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<IUserInfo, void>({
      query: () => 'profile',
    }),
  }),
});

export const { useGetUserProfileQuery } = UserProfileAPI;
