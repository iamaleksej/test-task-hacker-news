import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getPostsId } from "../../services/api/apiPostsSlice";
import { AppDispatch } from "../../store";
import Loader from "../Loader";
import styles from './PostsList.module.sass'
import voteArrow from '../../assets/images/votearrow.gif'
import updateIcon from '../../assets/images/update.png'
import { useNavigate } from "react-router-dom";

const PostsList: FC = () => {
   const { postsData, loading } = useTypedSelector((state) => state.posts);
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const [isWillUpdatePosts, setWillUpdatePosts] = useState(false)

   useEffect(() => {
      const controller = new AbortController()
      const { signal } = controller
      dispatch(getPostsId({ options: { signal } }))
      setInterval(() => dispatch(getPostsId({ options: { signal } })), 60000)
      setWillUpdatePosts(false)
      return () => controller.abort()
   }, [isWillUpdatePosts])

   const navigateHandler = (id: number | null) => {
      navigate(`./${id}`)
      console.log(id)
   }

   return (
      <div className="container">
         <div className={styles.posts}>
            <div className={styles.update}>
               <img
                  src={updateIcon}
                  alt="update icon"
                  className={styles.imageUpd}
                  onClick={() => setWillUpdatePosts(true)}
               />
            </div>
            {!postsData && <Loader />}
            {!loading && (
               <>
                  {postsData?.map(({ id, data }) => {
                     return (
                        <div
                           className={styles.post}
                           key={id}
                           onClick={() => navigateHandler(id)}
                        >
                           <div className={styles.upvote} title="Up Vote">
                              <img src={voteArrow} alt="vote arrow" />
                           </div>
                           <div>
                              <div className={styles.title}>{data?.title}</div>
                              {data?.time && (
                                 <div className={styles.subtext}>{`${data?.score} points by ${data?.by} | ${new Date(data?.time).getDate() + "." + (new Date(data?.time).getMonth() + 1) + "." + new Date(data?.time).getFullYear() + " " + new Date(data?.time).getHours() + ":" + new Date(data?.time).getMinutes()}`}</div>
                              )}
                           </div>
                        </div>
                     )
                  })}
               </>
            )}
         </div>
      </div>
   )
}

export default PostsList