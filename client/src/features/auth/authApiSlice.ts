import { apiSlice } from '../../app/api/apiSlice';
import { UserInterface, UserSigninInterface } from '../../types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    signin: builder.mutation({
      query: (credentials: UserSigninInterface) => ({
        url: '/user/signin',
        method: 'POST',
        body: { ...credentials },
      }),
      transformResponse: (reponse: {
        data: {
          user: UserInterface;
          token: string;
        };
        message: string;
      }) => {
        return reponse.data;
      },
      transformErrorResponse: (response: {
        data: {
          message: string;
        };
        status: number;
      }) => {
        return response.data.message;
      },
    }),

    signup: builder.mutation({
      query: (credentials: UserSigninInterface) => ({
        url: '/user/signup',
        method: 'POST',
        body: { ...credentials },
      }),
      transformResponse: (response: {
        data: {
          user: UserInterface;
          token: string;
        };
        message: string;
      }) => {
        return response.data;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
        };
        status: number;
      }) => {
        return error.data.message;
      },
    }),

    postAvatar: builder.mutation({
      query: (file: any) => ({
        url: 'image/image',
        method: 'POST',
        body: file,
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: '/user/signout',
        method: 'DELETE',
        body: {},
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: '/user/',
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  usePostAvatarMutation,
  useSignoutMutation,
  useGetCurrentUserQuery,
} = authApiSlice;
