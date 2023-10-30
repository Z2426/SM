import  express from "express"
import {createPost,getPost,getPosts,
    getUserPost,getComments,likePost,
    likePostComment,replyPostComment,
    commentPost,deletePost} from "../controller/postController.js"
import {userAuth} from "../middleware/authMiddleware.js"
 const router =express.Router()
 //delete post
 router.delete("/:id",userAuth,deletePost)
 //like and comment on post
 router.post("/like/:id",likePost)
 router.post("/like-comment/:id/:rid?",userAuth,likePostComment)
 router.post("/reply-commnet/:id",userAuth,replyPostComment)
 router.post("/comment/:id",userAuth,commentPost)
 //get comments
 router.get("/comments/:postId",getComments)
 //get post
 router.post("/get-user-post/:id",userAuth,getUserPost)
 router.post("/:id",userAuth,getPost)
// create post
router.post("/create-post",userAuth,createPost)
//get posts
router.post("/",userAuth,getPosts)
 export default router