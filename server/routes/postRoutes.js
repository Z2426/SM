import express from "express"
import {
  createPost,
  getPost,
  getPosts,
  getUserPost,
  getComments,
  likePost,
  likePostComment,
  replyPostComment,
  commentPost,
  deletePost,
  getTimeCreatePost,
  getCommentAndReplyCount,
} from "../controller/postController.js"
import { userAuth } from "../middleware/authMiddleware.js"

const router = express.Router()
router.get("/count-all-comment-post/:postId", getCommentAndReplyCount)
router.post("/get-time-create-post/:postId", getTimeCreatePost)
// crete post
router.post("/create-post", userAuth, createPost)
// get posts

router.post("/:id", userAuth, getPost)
router.post("/", userAuth, getPosts)
router.post("/", userAuth, getPosts)
router.post("/get-user-post/:id", userAuth, getUserPost);
// get comments
router.get("/comments/:postId", getComments)
//like and comment on posts
router.post("/like/:postId", userAuth, likePost)
router.post("/like/:postId", userAuth, likePost)
router.post("/like-comment/:id/:rid?", userAuth, likePostComment)
router.post("/comment/:postId", userAuth, commentPost)
router.post("/comment/:postId", userAuth, commentPost)
router.post("/reply-comment/:id", userAuth, replyPostComment)
//delete post
router.delete("/:id", userAuth, deletePost)

export default router
