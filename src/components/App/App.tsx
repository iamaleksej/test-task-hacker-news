import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import PostsItem from "../PostsItem"
import PostsList from "../PostsList"
import './App.sass'

const App: FC = () => {
   return (
      <Routes>
         <Route path="/" element={<PostsList />} />
         <Route path="/:id" element={<PostsItem />} />
      </Routes>
   )
}

export default App