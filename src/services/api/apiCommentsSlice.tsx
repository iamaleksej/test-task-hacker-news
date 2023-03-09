import { createAsyncThunk } from "@reduxjs/toolkit";


export const getComments = createAsyncThunk("onePost/getComments", async (
   comments: number[]) => {
   try {
      let arrComments: any[] = []
      for (let id of comments) {
         try {
            const res = await fetch(
               `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
            )
            const data = await res.json()
            arrComments.push(data)
         } catch (err) {
            console.log(err);
         }
      }
      return arrComments
   } catch (err) {
      console.log(err);
   }
});

export const getChildComments = createAsyncThunk("onePost/getChildComments", async (
   id: number) => {

   try {
      const resComments = await fetch(
         `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
      )
      const dataComments = await resComments.json()
      if (dataComments.kids) {
         const { kids } = dataComments
         let arrComments: any[] = []
         for (let i = 0; i < kids.length; i++) {
            try {
               const resChildComments = await fetch(
                  `https://hacker-news.firebaseio.com/v0/item/${kids[i]}.json?print=pretty`,
               )

               const dataChildComments = await resChildComments.json()

               let obj: { id: number | null, dataComment: {} | null } = {
                  id: null,
                  dataComment: null
               }

               obj['id'] = kids[i]
               obj['dataComment'] = dataChildComments
               arrComments.push(obj)
            } catch (err) {
               console.log(err);
            }
         }
         dataComments.childComments = arrComments
      }
      return dataComments
   } catch (err) {
      console.log(err);
   }
});