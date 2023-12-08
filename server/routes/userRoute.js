import { verify } from "crypto"
import express from "express"
import path from "path"

import {userAuth } from "../middleware/authMiddleware.js"
import  {requestPaswordReset, verifyEmail,resetPassword,
  changePassword,friendRequest,acceptRequest,
  getFriendRequest,profileViews,suggestedFriends,
  getUser,updateUser,
}  from "../controller/userController.js"
import { resetPasswordLink } from "../untils/sendEmail.js"
const router =express.Router()
const __dirname =path.resolve(path.dirname(""))
//view profile
router.post("/profile-view",userAuth,profileViews)
//suggested friends
router.post("/suggested-friends",userAuth,suggestedFriends)


//suggest profile

//accept /deny friend request
router.post("/accept-request",userAuth,acceptRequest)
// friend request 
router.post("/friend-request",userAuth,friendRequest)
router.post("/get-friend-request",userAuth,getFriendRequest)
//user routes
router.post("/get-user/:id",userAuth,getUser)
router.put("/update-user",userAuth,updateUser)


//Password reset
router.get("/reset-password/:userId/:token",resetPassword)//2
router.post('/request-passwordreset',requestPaswordReset)//1
router.post("/reset-password",changePassword)//3


router.get("/verify/:userId/:token",verifyEmail)
//bug : not verified data html
router.get("/verified",(req,res)=>{
    //res.send("123")
    
     res.sendFile(path.join(__dirname,'views', 'verifiedpage.html'))
   // res.sendFile(path.join(__dirname),"./view/verifieldpage.html")
})
router.get("/resetpassword",(req,res)=>{
    //res.send("123")
    
     res.sendFile(path.join(__dirname,'views', 'verifiedpage.html'))
   // res.sendFile(path.join(__dirname),"./view/verifieldpage.html")
})
router.get('/',(req,res)=>{
    res.send("userRoute")
})
export default router