import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

interface UsersState {
  usersList: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UsersState = {
  usersList: [],
  status: "idle",
};

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (data: { searchTerm: string }) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${data.searchTerm}&per_page=5`
      );
      return response.data.items || [];
    } catch (error) {
      console.error("Error fetching users data: ", error);
      return [];
    }
  }
);

// Reducers
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.usersList = action.payload;
    });
    builder.addCase(searchUsers.rejected, (state) => {
      state.status = "failed";
      state.usersList = [];
    });
  },
});

// Selectors
export const searchedUsers = (state: RootState) => state.users.usersList;
export const searchUsersStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
