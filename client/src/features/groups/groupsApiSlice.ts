import { apiSlice } from '@/app/api/apiSlice';

export const GroupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => {},
    }),
    createGroup: builder.mutation({
      query: () => ({
        url: '/groups/create',
        method: 'POST',
        body: {},
      }),
    }),
  }),
});

export const { useGetGroupsQuery, useCreateGroupMutation } =
  GroupsApiSlice;
