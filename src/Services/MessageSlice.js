import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const URLAPI = "http://localhost:1111/";
export const NLPServer = createApi({
  reducerPath: 'NLPServer',
  baseQuery: fetchBaseQuery({ baseUrl: URLAPI }),
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