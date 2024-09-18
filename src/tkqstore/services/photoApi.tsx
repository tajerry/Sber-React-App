import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../constants";
import { FetchArgs } from "@reduxjs/toolkit/dist/query/react";
interface Photo {
  id: number;
  title: string;
  url: string;
}
export const photoApi = createApi({
  reducerPath: "photoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api` }),
  tagTypes: ["PHOTO"],
  endpoints: (builder) => {
    return {
      getPhotosALL: builder.query<Photo[], void>({
        query: (): string | FetchArgs => {
          return `/photos`;
        },
        providesTags: ["PHOTO"],
      }),
      getPhotoById: builder.query({
        query: (id: number): string | FetchArgs => {
          return `/photos/${id}`;
        },
      }),
      deletePhoto: builder.mutation({
        query: (id: number): string | FetchArgs => ({
          url: `/photos/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["PHOTO"],
      }),
    };
  },
});

export const {
  useGetPhotosALLQuery,
  useDeletePhotoMutation,
  useGetPhotoByIdQuery,
} = photoApi;
