import { apiSlice } from '@/app/api/apiSlice';
import { groupRideInterface } from '@/types';

export const GroupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: ({
        limit,
        name,
        filtre,
      }: {
        limit: number;
        name: string;
        filtre: string;
      }) => ({
        url: `/group?filtre=${filtre}&name=${name}&limit=${limit}`,
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

    getGroupsJoined: builder.query({
      query: ({
        limit,
        name,
        userId,
        filtre,
      }: {
        limit: number;
        name: string;
        userId: string;
        filtre: string;
      }) => ({
        url: `group/joined-groups?filtre=${filtre}&name=${name}&limit=${limit}&userId=${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: { groups: groupRideInterface[] };
      }) => {
        return response.data.groups;
      },
    }),

    getGroupsCreated: builder.query({
      query: (userId: string) => ({
        url: `/group/groups-created?userId=${userId}&limit=${20}`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: { groups: groupRideInterface[] };
        message: string;
      }) => {
        return response.data.groups;
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

    askToJoinGroup: builder.mutation({
      query: ({
        user,
        groupId,
      }: {
        user: {
          username: string;
          id: string;
        };
        groupId: string;
      }) => ({
        url: '/group/ask-to-join',
        method: 'POST',
        body: {
          groupId,
          user,
        },
      }),
    }),

    joinGroup: builder.mutation({
      query: ({
        user,
        groupId,
      }: {
        user: {
          username: string;
          id: string;
        };
        groupId: string;
      }) => ({
        url: '/group/join',
        method: 'POST',
        body: {
          groupId,
          user,
        },
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useAskToJoinGroupMutation,
  useJoinGroupMutation,
  useGetGroupsJoinedQuery,
  useGetGroupsCreatedQuery,
} = GroupsApiSlice;
