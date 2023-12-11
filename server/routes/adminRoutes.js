import express from "express"
import { userAuth,isAdmin } from "../middleware/authMiddleware.js"
import {getAllUsers,ShowDetailUser,changeUserStatus,searchOnlyUserByEmailOrName,sortUserWithCritical} from "../controller/adminController.js"
import { historyActivityOfUser } from "../controller/historyActivityController.js"
const router = express.Router()
// -----ADMIN-------
//sort flied with critical
///sort-user?type=createdAt&typeSort=asc 
router.get("/sort-user",sortUserWithCritical)
//search email or name
router.get("/search",searchOnlyUserByEmailOrName)
//get all user 
router.get("/show-all-user",userAuth,isAdmin,getAllUsers)
//get detail user
router.get("/:userId",userAuth,isAdmin,getAllUsers)
//show active history user
router.get("/history-activity/:userId",userAuth,isAdmin,historyActivityOfUser)
//block/unlock user
router.put("/change-status-user/:userId",changeUserStatus)
//xem chi tiet user
router.get("/detail-user/:userId",userAuth,isAdmin,ShowDetailUser)
//Home admin
router.get("/",userAuth,isAdmin,(req,res)=>{
  res.status(200).json({
    status: 'success',
    message: 'Request successfully processed.',
  })
})


export default router
