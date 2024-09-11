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
// -----USER-------
//view profile
router.post("/profile-view", userAuth, profileViews)
//suggested friends
router.post("/suggested-friends", userAuth, suggestedFriends)
//accept /deny friend request
router.post("/accept-request", userAuth, acceptRequest)
// friend request
router.post("/friend-request", userAuth, friendRequest)
router.post("/get-friend-request", userAuth, getFriendRequest)
//user routes
router.post("/get-user/:id?", userAuth, getUser)
router.put("/update-user", userAuth, updateUser)
//Password reset
router.get("/reset-password/:userId/:token", resetPassword);//2
router.post("/request-passwordreset", requestPaswordReset) //1
router.post("/reset-password", changePassword) //3
//search name
router.post("/search/:keyword?", userAuth, searchUsersByName);
router.get("/verify/:userId/:token", verifyEmail)
router.get("/", (req, res) => {
  res.send("userRoute");
})
export default router;
