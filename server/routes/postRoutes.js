import express from "express"
import* as postController from "../controller/postController.js"
import { userAuth } from "../middleware/authMiddleware.js"

const router = express.Router()
//handle route reply
router.put("/comments/:commentId/replies/:replyId",userAuth,postController.editReply)
router.delete("/comments/:commentId/replies/:replyId",userAuth,postController.deleteReply)
router.get("/comments/:commentId/replies",userAuth,postController.getRepliesByComment)
router.post("/comments/:commentId/replies",userAuth,postController.replyPostComment)
//hanle route comment 
router.delete("/comments/:commentId",userAuth,postController.deleteComment)
router.put("/comments/:commentId",userAuth,postController.editComment)
router.put("/comments/:commentId",userAuth,postController.editComment)
router.post("/:postId/comments",userAuth,postController.commentPost)
router.get("/:postId/comments",userAuth,postController.getComments)
//like post  #chưa test comment ,reply
router.put("/like/:entityId/:type",userAuth,postController.toggleLike)
//view post
router .put("/view/:postId",userAuth,postController.viewPost)
// API  CRUD POST
router.get("/user/:userId",userAuth,postController.getUserPost)
router.post("/", userAuth, postController.createPost)
router.put('/:postId', userAuth,postController.updatePost);
router.delete('/:postId',userAuth, postController.deletePost);
router.get('/:postId',userAuth, postController.getPost);
export default router
