import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../constants";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api` }),
  tagTypes: ["COMMENT"],
  endpoints: (builder) => {
    return {
      getCommentALL: builder.query({
        query: (id: number): string | FetchArgs => {
          return `posts/${id}/comments`;
        },
        providesTags: ["COMMENT"],
      }),
      createComment: builder.mutation({
        query: (payload: any): string | FetchArgs => {
          return {
            url: `/posts/${payload.postId}/comments`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["COMMENT"],
      }),
      deleteComment: builder.mutation({
        query: (id: number): string | FetchArgs => ({
          url: `/comments/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["COMMENT"],
      }),
    };
  },
});

export const {
  useGetCommentALLQuery,
  useDeleteCommentMutation,
  useCreateCommentMutation,
} = commentApi;
