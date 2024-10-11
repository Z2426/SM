import express from "express";
import { userAuth, isAdmin } from "../middleware/authMiddleware.js";
import {
  requestPasswordReset,
  verifyEmail,
  resetPassword,
  changePassword,
  friendRequest,
  respondToFriendRequest,
  getFriendRequest,
  profileViews,
  getUser,
  updateUser,unFriend ,
} from "../controller/userController.js";
const router = express.Router();
// ----MANAGE FRIEND
//unfriend
router.post("/unfriend",userAuth,unFriend)
//accept /deny friend request
router.post("/friend-requests/respond", userAuth, respondToFriendRequest)
// friend request
router.post("/friend-request", userAuth, friendRequest)
router.get("/get-friend-request", userAuth, getFriendRequest)
// -----USER-------
//view profile
router.get("/profile-view", userAuth, profileViews)
// user routes
router.get("/get-user/:userId?", userAuth, getUser)
router.put("/update-user", userAuth, updateUser)
//verify email
router.get("/verify/:userId/:token",verifyEmail)
//Password reset
router.get("/reset-password/:userId/:token", resetPassword);//2
router.post("/request-passwordreset", requestPasswordReset) //1
router.post("/reset-password", changePassword) //3
router.get("/", (req, res) => {
  res.send("userRoute");
})
export default router;
