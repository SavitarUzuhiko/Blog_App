import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi/baseApi'
import createPostReducer from './slices/createPost/useCreatePost'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    createPost: createPostReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch