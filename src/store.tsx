import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './reducers/postsSlice'
import onePostReducer from './reducers/onePostSlice'


export const store = configureStore({
   reducer: {
      posts: postsReducer,
      onePost: onePostReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch