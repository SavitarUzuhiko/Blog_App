import { fetchBaseQuery , createApi} from "@reduxjs/toolkit/query/react";

export const baseUrl = 'http://localhost:5000/'

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
  tagTypes: ['Blog'],
});
