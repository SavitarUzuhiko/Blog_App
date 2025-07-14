import type { Blog } from '@/app/api/blogApi/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  isOpen: boolean;
  status: string;
  data: Blog;
}

const initialState: CounterState = {
  isOpen: false,
  status: '',
  data: {
    _id: '',
    title: '',
    content: '',
    image: '',
  },
};

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
      state.status = '';
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    setEditor: (state, { payload }: PayloadAction<Blog>) => {
      state.isOpen = true;
      state.status = 'edit';
      state.data = { ...payload };
      console.log(initialState.data);
    },
  },
});

export const { onOpen, onClose, setEditor } = createPostSlice.actions;

export default createPostSlice.reducer;

