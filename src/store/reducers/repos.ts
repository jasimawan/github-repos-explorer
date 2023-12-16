import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";
import { Repo } from "../../types";

interface ReposState {
  reposList: Repo[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ReposState = {
  reposList: [],
  status: "idle",
};

export const getUserRepos = createAsyncThunk(
  "repos/getUserRepos",
  async (data: { userName: string }) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${data.userName}/repos`
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching users data: ", error);
      return [];
    }
  }
);

// Reducers
export const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserRepos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserRepos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.reposList = action.payload;
    });
    builder.addCase(getUserRepos.rejected, (state) => {
      state.status = "failed";
      state.reposList = [];
    });
  },
});

// Selectors
export const userRepos = (state: RootState) => state.repos.reposList;
export const userReposStatus = (state: RootState) => state.repos.status;

export default reposSlice.reducer;
