import { calculatesTime } from "../untils/index.js"
import Notification from "../models/NotificationModel.js"
export const changeStatusViewedNotificaion = async (req, res) => {
  const notificationId = req.params.notificationId
  const { userId } = req.body.user
  try {
    const notification = await Notification.findById(notificationId)
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }
    // Kiểm tra xem userId của notification có khớp với userId trong request không
    if (notification.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to change notification status' })
    }
    // Đảo ngược trạng thái viewed
    notification.viewed = !notification.viewed
    await notification.save()
    return res.status(200).json({ message: 'success' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
export const getAllNotifications = async (req, res) => {
  const { userId } = req.body.user
  try {
    let notifications = await Notification
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('createdBy', '-password')
    notifications = notifications.map(notification => {
      const postTime = calculatesTime (notification.createdAt)
      return {
        ...notification.toObject(),
        Timecreated: postTime
      }
    })
    res.status(200).json({
      success: true,
      notifications: notifications,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    })
  }
}