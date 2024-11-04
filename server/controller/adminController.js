import Users from "../models/userModel.js";
import { isValidEmail } from "../untils/index.js";
//get all user
export const getAllUsers = async (req, res) => {
  console.log(1);

  try {
    const usersWithUserRole = await Users.find({ role: "User" }).select(
      "-password"
    );
    res.status(200).json({
      status: "success",
      message: "Get all users successfully.",
      data: usersWithUserRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch non-admin users.",
      error: error.message,
    });
  }
};
//block/unlock user
export const changeUserStatus = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userToUpdate = await Users.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }
    const newStatus = !userToUpdate.statusActive;
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { statusActive: newStatus },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "User status updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user status.",
      error: error.message,
    });
  }
};
//xem chi tiet user
export const ShowDetailUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User details  successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user details.",
      error: error.message,
    });
  }
};
//tim kiem user ( ko co quyen admin)
export const searchOnlyUserByEmailOrName = async (req, res) => {
  try {
    const { keyword } = req.query;
    console.log(keyword);
    let result;
    if (isValidEmail(keyword)) {
      result = await Users.find({ email: keyword });
    } else {
      result = await Users.find({ firstName: keyword });
    }
    res.json({
      type: "search",
      data: result,
    }); // Trả về kết quả dưới dạng JSON
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm người dùng." });
  }
};
//sort field
export const sortUserWithCritical = async (req, res) => {
  const { type, typeSort } = req.query;
  console.log(`${type}-${typeSort}`);
  const sortCriteria = {};
  sortCriteria[type] = typeSort === "asc" ? 1 : -1;
  const userList = await Users.find().sort(sortCriteria);
  res.json({ users: userList });
};
