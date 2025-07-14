import { baseApi } from '../baseApi/baseApi';
import type { GetRequest, GetResponse , PostResponse} from './type';

const baseUrl = 'blog/'

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<GetResponse, GetRequest>({
      query: ({ page = 1, limit = 10 }) =>
        baseUrl + `all?page=${page}&limit=${limit}`,
      providesTags: ['Blog'],
    }),
    postBlog: builder.mutation<PostResponse, FormData>({
      query: (formData) => ({
        url: baseUrl + 'add/',
        method: 'POST',
        body: formData,
        providesTags: ['Blog'],
      }),
    }),
    deleteBlog: builder.mutation<PostResponse, String>({
      query: (id) => ({
        url: baseUrl + 'delete/' + id,
        method: 'DELETE',
        providesTags: ['Blog'],
      }),
    })
  }),
});

export const { useGetAllBlogsQuery, usePostBlogMutation , useLazyGetAllBlogsQuery, useDeleteBlogMutation} = blogApi;

