import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Url {
  _id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string
}

export const urlApi = createApi({
  reducerPath: "urlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Urls","Auth"],
  endpoints: (builder) => ({
    getUrls: builder.query<ApiResponse<Url[]>, void>({
      query: () => "/urls",
      // providesTags: ["Urls"],
      providesTags: (result) => result ? [...result.data.map((url) =>
        ({ type: "Urls" as const, id: url._id, })), { type: "Urls" as const, id: "LIST" },"Auth"]
        : ["Auth",{ type: "Urls" as const, id: "LIST" }],
    }),
    createUrl: builder.mutation<ApiResponse<Url>, { originalUrl: string }>({
      query: (body) => ({
        url: "/urls",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Urls"],
      invalidatesTags: [{ type: "Urls", id: "LIST" }],
    }),
    deleteUrl: builder.mutation<ApiResponse<null>,string>({
      query: (id) => ({
        url: `/urls/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, id) => [
        { type: "Urls", id },
        { type: "Urls", id: "LIST" },
      ],
    }),
  }),
})

export const { useGetUrlsQuery, useCreateUrlMutation,useDeleteUrlMutation } = urlApi;