import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
};

interface ReposState {
  reposList: Repo[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ReposState = {
  reposList: [],
  status: "idle",
};

export const getUserRepos = createAsyncThunk<Repo[]>(
  "repos/getUserRepos",
  async (userName) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${userName}/repos`
      );
      return response.data.items || [];
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
export const searchedRepos = (state: RootState) => state.repos.reposList;
export const searchReposStatus = (state: RootState) => state.repos.status;

export default reposSlice.reducer;
