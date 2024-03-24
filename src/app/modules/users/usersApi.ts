import { api } from "../../api.ts";
import {
  TEditUserPayload,
  TEditUserResponse,
  TGetUserResponse,
  TGetUsersPagination,
  TGetUsersResponse,
} from "./types.ts";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<TGetUsersResponse, TGetUsersPagination>({
      query: ({ limit, page }) => ({
        url: `business/users?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Users"],
    }),
    getUser: build.query<TGetUserResponse, { id: string }>({
      query: ({ id }) => ({
        url: `business/users/${id}`,
      }),
      providesTags: ["Users"],
    }),
    editUser: build.mutation<TEditUserResponse, { id: string; body: TEditUserPayload }>({
      query: ({ id, body }) => ({
        url: `business/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: `business/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: build.mutation<TGetUsersResponse, { body: TEditUserPayload }>({
      query: ({ body }) => ({
        url: `business/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation, useEditUserMutation, useCreateUserMutation } =
  usersApi;
