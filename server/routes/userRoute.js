import express from "express";
import { userAuth, isAdmin } from "../middleware/authMiddleware.js";
import {
  requestPaswordReset,
  verifyEmail,
  resetPassword,
  changePassword,
  friendRequest,
  acceptRequest,
  getFriendRequest,
  profileViews,
  suggestedFriends,
  getUser,
  updateUser,
  searchUsersByName,
} from "../controller/userController.js";
const router = express.Router();
// ----MANAGE FRIEND
//suggested friends
router.post("/suggested-friends", userAuth, suggestedFriends)
//accept /deny friend request
router.post("/accept-request", userAuth, acceptRequest)
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
router.post("/request-passwordreset", requestPaswordReset) //1
router.post("/reset-password", changePassword) //3
router.get("/", (req, res) => {
  res.send("userRoute");
})
export default router;
