import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/posts';

export const STATUS = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
});

// Thunks
const API_URL = 'http://localhost:3500/posts';
export const fetchPosts = createAsyncThunk('posts', async () => {
  const response = await fetch(API_URL);
  return await response.json();
});

export const fetchPostById = createAsyncThunk('getPostById', async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
});

export const deletePostById = createAsyncThunk('deletePostById', async (id) => {
  const response = await api.delete(`${API_URL}/${id}`);
  return await response.json();
});

export const createPost = createAsyncThunk('addPost', async (newPost) => {
  const response = await api.post(API_URL, newPost);
  return await response.json();
});

export const updatePost = createAsyncThunk(
  'updatePostById',
  async (updatedPost) => {
    const response = await api.put(`${API_URL}/${updatedPost.id}`, updatedPost);
    return await response.json();
  }
);

export const likeById = createAsyncThunk('likePostById', async (id) => {
  const likedPost = await (await fetch(`${API_URL}/${id}`)).json();
  await api.patch(`${API_URL}/${id}`, {
    likes: likedPost.likes + 1,
  });
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    data: [],
    status: STATUS.IDLE,
    post: {},
    likes: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For fetching all posts
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })

      // For fetching a single post by ID
      .addCase(fetchPostById.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.post = action.payload;
        state.likes = state.post.likes;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })

      // For deleting a post by ID
      .addCase(deletePostById.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
      })
      .addCase(deletePostById.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })

      // For creating a new post
      .addCase(createPost.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.data = [...state.data, action.payload];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })

      // For updating an existing post by ID
      .addCase(updatePost.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.data = [...state.data, action.payload];
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })

      // For liking a post
      .addCase(likeById.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(likeById.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.likes = state.likes + 1;
      })
      .addCase(likeById.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export default postSlice.reducer;
