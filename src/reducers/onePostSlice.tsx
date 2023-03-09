import { createSlice } from "@reduxjs/toolkit";
import { getChildComments, getComments } from "../services/api/apiCommentsSlice";
import { getOnePost } from "../services/api/apiOnePostSlice"
import { OnePostState } from "../types";

export const onePost = createSlice({
   name: "onePost",
   initialState: {
      onePostData: {},
      comments: [],
      childComments: {},
      loading: true,
   } as OnePostState,
   reducers: {
      clearComments(state, { payload }) {
         state.childComments = payload
      }
   },
   extraReducers: builder => {
      builder.addCase(getOnePost.pending, (state) => {
         state.loading = true;
      })
      builder.addCase(getOnePost.fulfilled, (state, { payload }) => {
         state.loading = false;
         state.onePostData = payload
      })
      builder.addCase(getComments.fulfilled, (state, { payload }) => {
         state.comments = payload
      })
      builder.addCase(getChildComments.fulfilled, (state, { payload }) => {
         state.childComments = payload
      })
      builder.addCase(getOnePost.rejected, (state) => {
         state.loading = false;
      })
   }
});

export default onePost.reducer