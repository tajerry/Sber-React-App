import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../constants";
import { FetchArgs } from "@reduxjs/toolkit/dist/query/react";
interface Post {
  title: string;
  body: string;
  id: number;
}
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api` }),
  tagTypes: ["POSTS"],
  endpoints: (builder) => {
    return {
      getPostsALL: builder.query<Post[], void>({
        query: ():  string | FetchArgs => {
          return `/posts`;
        },
        providesTags: ["POSTS"],
      }),
      getPostById: builder.query({
        query: (id: number): string | FetchArgs => {
          return `/posts/${id}`;
        },
        providesTags: ["POSTS"],
      }),
      editPost: builder.mutation({
        query: (payload): string | FetchArgs => {
          const { id, ...body } = payload;
          return {
            url: `/posts/${id}`,
            method: "PUT",
            body,
          };
        },
        invalidatesTags: ["POSTS"],
      }),
      createPost: builder.mutation({
        query: (payload: object): string | FetchArgs => {
          return {
            url: `/posts`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["POSTS"],
      }),
      deletePost: builder.mutation({
        query: (id: number): string | FetchArgs => ({
          url: `/posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["POSTS"],
      }),
    };
  },
});
export const {
  useGetPostsALLQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useCreatePostMutation,
  useGetPostByIdQuery,
} = postApi;
