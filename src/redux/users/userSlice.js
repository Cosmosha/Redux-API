import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://randomuser.me/api/?results=5';

const initialState = {
  users: [],
  isLoading: true,
  error: undefined,
};

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (user, thunk) => {
    try {
      const resp = await axios(url);
      // console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue('something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (build) => {
    build
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice;
