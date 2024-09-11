import express from "express"
import { changeStatusViewedNotificaion, getAllNotifications } from "../controller/notificationController.js"
import { userAuth } from "../middleware/authMiddleware.js"
const router = express.Router()
router.put("/:notificationId/toggle-viewed", userAuth, changeStatusViewedNotificaion)
router.get("/", userAuth, getAllNotifications)
export default router