import { apiSlice } from '@/app/api/apiSlice';
import { groupRideInterface } from '@/types/group';

export const GroupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: ({ limit, name }: { limit: number; name: string }) => ({
        url: `/group?limit=${limit}&name=${name}`,
        method: 'GET',
      }),
      transformResponse: (reponse: {
        data: {
          groups: groupRideInterface[] | [];
        };
      }) => {
        return reponse.data.groups;
      },
    }),

    createGroup: builder.mutation({
      query: (group: groupRideInterface) => ({
        url: '/group/create',
        method: 'POST',
        body: { ...group },
      }),
      transformResponse: (reponse: {
        data: {
          group: groupRideInterface;
        };
        message: string;
      }) => {
        return reponse.data.group;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
        };
        status: Number;
      }) => {
        return error.data.message;
      },
    }),
  }),
});

export const { useGetGroupsQuery, useCreateGroupMutation } =
  GroupsApiSlice;
