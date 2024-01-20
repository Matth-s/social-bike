//@ts-nocheck

import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  setCredentials,
  logout,
} from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: any,
  api: {
    getState: () => {
      (): any;
      new (): any;
      auth: { (): any; new (): any; user: any };
    };
    dispatch: (arg0: any) => void;
  },
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      '/user/refresh',
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
