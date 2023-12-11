import Users from "../models/userModel.js"
import { calculatesTime } from "../untils/index.js"
//get all user 
export const getAllUsers = async (req, res) => {
  try {
    const nonAdminUsers = await Users.find({ role: { $ne: 'admin' } });
    const nonAdminUsersWithTime = nonAdminUsers.map((user) => {
      return {
        ...user.toObject(),
        timecreated: calculatesTime(user.createdAt),
      }})
    res.status(200).json({
      status: 'success',
      message: 'Get all users successfully.',
      data: nonAdminUsersWithTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch non-admin users.',
      error: error.message,
    });
  }
};

//block/unlock user
export const changeUserStatus = async (req, res) => {
  const userId = req.params.userId
  
  try {
    const userToUpdate = await Users.findById(userId)
    if (!userToUpdate) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }
    const newStatus = !userToUpdate.statusActive
    const updatedUser = await Users.findByIdAndUpdate(userId, { statusActive: newStatus }, { new: true })
    res.status(200).json({
      status: 'success',
      message: 'User status updated successfully.',
      data: updatedUser,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user status.',
      error: error.message,
    })
  }
}
//xem chi tiet user
export const ShowDetailUser = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'User details  successfully.',
      data: user,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user details.',
      error: error.message,
    })
  }
}