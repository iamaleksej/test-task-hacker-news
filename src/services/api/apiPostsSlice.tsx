import { createAsyncThunk } from "@reduxjs/toolkit";
import { arrPostsState, GetPostsIdState } from "../../types";


export const getPostsId = createAsyncThunk("posts/getPostsId", async ({
   options = {}
}: GetPostsIdState) => {

   try {
      const res = await fetch(
         `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`, options
      )

      const dataId = await res.json()
      const newDataId = dataId.splice(0, 100)
      let arrPosts: arrPostsState[] = []
      for (let id of newDataId) {
         try {
            const resId = await fetch(
               `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
            )
            const data = await resId.json()
            let obj: arrPostsState = {
               id: null,
               data: null
            }
            obj['id'] = id
            obj['data'] = data
            arrPosts.push(obj)
         } catch (err) {
            console.log(err);
         }
      }
      return arrPosts
   } catch (err) {
      console.log(err);
   }
});