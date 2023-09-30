import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const NLPServer = createApi({
  reducerPath: 'NLPServer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1111/' }),
  endpoints: (builder) => ({
    getResponse: builder.mutation({
      query: (data) => ({
            url:`sendrequest`,
            method:"POST",
            body:data
      }),
    }),
  }),
})

export const { useGetResponseMutation } = NLPServer