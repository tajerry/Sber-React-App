import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../constants";
import { FetchArgs } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api` }),
  tagTypes: ["USER"],
  endpoints: (builder) => {
    return {
      getUser: builder.query({
        query: (payload: object): string | FetchArgs => {
          return {
            url: `/user`,
            method: "POST",
            body: payload,
          };
        },
        providesTags: ["USER"],
      }),
      createUser: builder.mutation({
        query: (payload: object): string | FetchArgs => {
          return {
            url: `/users`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["USER"],
      }),
      deleteUser: builder.mutation({
        query: (id: number): string | FetchArgs => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["USER"],
      }),
    };
  },
});

export const { useGetUserQuery, useDeleteUserMutation, useCreateUserMutation } =
  userApi;
