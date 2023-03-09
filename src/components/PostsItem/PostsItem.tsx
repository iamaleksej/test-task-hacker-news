import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { getChildComments, getComments } from "../../services/api/apiCommentsSlice"
import { getOnePost } from "../../services/api/apiOnePostSlice"
import { AppDispatch } from "../../store"
import styles from './PostsItem.module.sass'
import updateIcon from '../../assets/images/update.png'
import { clearComments } from "../../actions/clearComments"


const PostsItem: FC = () => {
   const { onePostData, comments, childComments, } = useTypedSelector((state) => state.onePost);
   const kids = onePostData?.kids
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const [isWillUpdatePosts, setWillUpdatePosts] = useState(false)

   const { id } = useParams()

   const goBackHandler = () => {
      navigate(`./..`)
   }

   useEffect(() => {
      const controller = new AbortController()
      const { signal } = controller

      dispatch(getOnePost({ id, options: { signal } }))
      dispatch(clearComments({}))
      return () => controller.abort()
   }, [])

   useEffect(() => {
      if (kids) {
         dispatch(getComments(kids))
         setWillUpdatePosts(false)
      }
   }, [kids, isWillUpdatePosts])

   const openCommentAnswers = (id: number) => {
      dispatch(getChildComments(id))
   }

   return (
      <div className={styles.post}>
         <div
            className={styles.btnBack}
            onClick={goBackHandler}
         >
            Back
         </div>
         <p className={styles.link}>{onePostData?.url}</p>
         <h1 className={styles.title}>{onePostData?.title}</h1>
         <div className="flex-jcsb">
            <div className={styles.author}>
               <div className={styles.name}>Author: {onePostData?.by}</div>
               {onePostData?.time && (
                  <div className={styles.date}>{new Date(onePostData?.time).getDate() + "." + (new Date(onePostData?.time).getMonth() + 1) + "." + new Date(onePostData?.time).getFullYear() + " " + new Date(onePostData?.time).getHours() + ":" + new Date(onePostData?.time).getMinutes()}</div>
               )}
            </div>
            <div className={styles.stats}>
               <div className={styles.statItem}>
                  <svg role="img" width="20" height="20" viewBox="0 0 24 24" fill="#fff" strokeWidth="1.5" stroke="#404040" xmlns="http://www.w3.org/2000/svg"><g><title></title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg></g></svg>
                  <p>{onePostData?.score}</p>
               </div>
               <div className={styles.statItem}>
                  <svg role="img" width="20" height="20" viewBox="0 0 24 24" fill="#fff" strokeWidth="1.5" stroke="#404040" xmlns="http://www.w3.org/2000/svg"><g><title></title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></g></svg>
                  <p>{onePostData?.descendants}</p>
               </div>
            </div>
         </div>
         <div className={styles.comments}>
            <div className={styles.commentsTitle}>
               {onePostData?.descendants} Comments
               <img
                  src={updateIcon}
                  alt="update icon"
                  className={styles.imageUpd}
                  onClick={() => setWillUpdatePosts(true)}
               />
            </div>
            {comments?.map((comment: any) => {
               return (
                  <div
                     className={styles.comment}
                     key={comment?.id}
                  >
                     <div className={styles.commentAuthor}>{comment?.by}</div>
                     <div className={styles.commentText} dangerouslySetInnerHTML={{ __html: comment?.text }}></div>
                     {comment.kids && (
                        <div
                           className={styles.openAnswer}
                           onClick={() => openCommentAnswers(comment.id)}
                        >
                           Open Answers
                        </div>
                     )}
                     {comment.id === childComments?.id && (
                        <div className={styles.commentAnswers}>
                           {Object.values(childComments.childComments)?.map(({ dataComment }: any) => {
                              return (
                                 <div className={styles.childComment} key={dataComment.id}>
                                    <div className={styles.childCommentAuthor}>{dataComment.by}</div>
                                    <div className={styles.childCommentText} dangerouslySetInnerHTML={{ __html: dataComment.text }}></div>
                                 </div>
                              )
                           })}
                        </div>
                     )}
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default PostsItem