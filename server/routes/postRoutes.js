import  express from "express"
import {createPost,getPosts} from "../controller/postController.js"
import {userAuth} from "../middleware/authMiddleware.js"
 const router =express.Router()
// create post
router.post("/create-post",userAuth,createPost)
//get post
router.post("/",userAuth,getPosts)
 export default router