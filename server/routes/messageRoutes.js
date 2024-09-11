import express from "express"
//import { userAuth, isAdmin } from "../middleware/authMiddleware.js";
import { createConversation,
     getUserConversations, 
     sendMessage, 
     getMessagesInConversationSortedByTime } from "../controller/messageController.js"
     import { userAuth } from "../middleware/authMiddleware.js"
const router = express.Router();
// create conservation
router.post("/conversations",userAuth, createConversation)
// get all conservation
router.get("/conversations/:userId",userAuth,  getUserConversations)
// get  all message in conservation
router.get("/:conversationId",userAuth,  getMessagesInConversationSortedByTime)
// send message
router.post("/",userAuth,sendMessage)
router.get("/", (req, res) => {
    res.send("page message")
})
export default router;