import  express from "express"
import {createPost,getPost,getPosts,
    getUserPost,getComments,likePost,
    likePostComment,replyPostComment,
    commentPost,deletePost} from "../controller/postController.js"
import {userAuth} from "../middleware/authMiddleware.js"
 const router =express.Router()
 // crete post
router.post("/create-post", userAuth, createPost);
// get posts
router.post("/", userAuth, getPosts);
router.post("/:id", userAuth, getPost);

router.post("/get-user-post/:id", userAuth, getUserPost);

// get comments
router.get("/comments/:postId", getComments);

//like and comment on posts
router.post("/like/:id", userAuth, likePost);
router.post("/like-comment/:id/:rid?", userAuth, likePostComment);
router.post("/comment/:id", userAuth, commentPost);
router.post("/reply-comment/:id", userAuth, replyPostComment);

//delete post
router.delete("/:id", userAuth, deletePost);

 export default router