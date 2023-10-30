import  express from "express"
import {createPost,getPost,getPosts,getUserPost} from "../controller/postController.js"
import {userAuth} from "../middleware/authMiddleware.js"
 const router =express.Router()
 //get post
 router.post("/get-user-post/:id",userAuth,getUserPost)
 router.post("/:id",userAuth,getPost)
// create post
router.post("/create-post",userAuth,createPost)
//get posts
router.post("/",userAuth,getPosts)
 export default router