import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetPostsState } from "../../types";


export const getOnePost = createAsyncThunk("posts/getOnePost", async ({
   id,
   options = {}
}: GetPostsState) => {

   try {
      const res = await fetch(
         `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, options
      )

      const data = await res.json()
      return data
   } catch (err) {
      console.log(err);
   }

});