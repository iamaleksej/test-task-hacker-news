import { createSlice } from "@reduxjs/toolkit";
import { getPostsId } from "../services/api/apiPostsSlice"
import { PostsState } from "../types";

export const postsSlice = createSlice({
   name: "posts",
   initialState: {
      postsData: [],
      loading: true,
   } as PostsState,
   reducers: {
   },
   extraReducers: builder => {
      builder.addCase(getPostsId.pending, (state) => {
         state.loading = true;
      })
      builder.addCase(getPostsId.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.postsData = payload
      })
      builder.addCase(getPostsId.rejected, (state) => {
         state.loading = false;
      })
   }
});

export default postsSlice.reducer