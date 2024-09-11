import mongoose from "mongoose";
import Users from "../models/userModel.js";
import Notification from "../models/NotificationModel.js";
import FriendsRequest from "../models/friendRequestModel.js";
import Verification from "../models/emailVerificationModel.js";
import { compareString, hashString } from "../untils/index.js";
import passwordReset from "../models/passwordResetModel.js";
import { resetPasswordLink } from "../untils/sendEmail.js";
import { createJWT } from "../untils/index.js";
//Tim kiem ban be
export const searchUsersByName = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const keyword = req.params.keyword;
    //console.log(keyword);
    const user = await Users.findById(userId).populate("friends");
    const userFriends = user.friends.map((friend) => friend._id);
    // Tạo biểu thức chính quy từ keyword (tên người dùng)
    const regex = new RegExp(keyword, "i"); // 'i' để không phân biệt chữ hoa chữ thường
    // Tìm kiếm người dùng theo tên và các điều kiện khác
    let suggestedUsers = await Users.aggregate([
      {
        $match: {
          $or: [
            { firstName: { $regex: regex } }, // Tìm kiếm theo tên người dùng
            { lastName: { $regex: regex } },
          ],
        },
      },
      {
        $addFields: {
          isFriend: {
            $cond: {
              if: { $in: ["$_id", userFriends] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $addFields: {
          matchedInfo: {
            $cond: {
              if: {
                $or: [
                  // Thêm điều kiện ngày sinh nếu tồn tại và là một ngày hợp lệ
                  user.birthDate instanceof Date && !isNaN(user.birthDate)
                    ? {
                      birthDate: {
                        $gte: new Date(
                          user.birthDate.getTime() -
                          5 * 365 * 24 * 60 * 60 * 1000
                        ),
                        $lte: new Date(
                          user.birthDate.getTime() +
                          5 * 365 * 24 * 60 * 60 * 1000
                        ),
                      },
                    }
                    : {},
                  user.profession ? { profession: user.profession } : {},
                  user.location ? { location: user.location } : {},
                  user.workplace ? { workplace: user.workplace } : {},
                ].filter(Boolean),
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $sort: { isFriend: -1, matchedInfo: -1 },
      },
      {
        $project: { firstName: 1, lastName: 1, email: 1, profileUrl: 1 },
      },
    ]);

    // Nếu không có người dùng phù hợp, lấy danh sách tất cả người dùng có tên khớp với từ khóa
    if (suggestedUsers.length === 0) {
      suggestedUsers = await Users.aggregate([
        {
          $match: {
            $or: [
              { firstName: { $regex: regex } },
              { lastName: { $regex: regex } },
            ],
          },
        },
        { $project: { firstName: 1, lastName: 1, email: 1, profileUrl: 1 } },
      ]);
    }

    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// API để gợi ý bạn bè theo các điều kiện
export const suggestedFriends = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const user = await Users.findById(userId).populate("friends");
    const userFriends = user.friends.map((friend) => friend._id);
    // Tạo một đối tượng để lọc điều kiện
    const filterConditions = [
      { _id: { $nin: userFriends, $ne: userId } },
      { friends: { $nin: userFriends } }, // Loại bỏ những người đã là bạn bè
    ];
    // Thêm điều kiện ngày sinh nếu tồn tại và là một ngày hợp lệ
    if (user.birthDate instanceof Date && !isNaN(user.birthDate)) {
      filterConditions.push({
        birthDate: {
          $gte: new Date(
            user.birthDate.getTime() - 5 * 365 * 24 * 60 * 60 * 1000
          ),
          $lte: new Date(
            user.birthDate.getTime() + 5 * 365 * 24 * 60 * 60 * 1000
          ),
        },
      });
    }
    // Thêm các điều kiện khác (nghề nghiệp, địa điểm, nơi làm việc) nếu tồn tại
    const additionalConditions = [
      user.profession ? { profession: user.profession } : {},
      user.location ? { location: user.location } : {},
      user.workplace ? { workplace: user.workplace } : {},
    ].filter((condition) => Object.keys(condition).length !== 0);
    filterConditions.push(...additionalConditions);
    // Tìm người dùng theo điều kiện lọc
    let suggestedUsers = await Users.aggregate([
      {
        $match: {
          $and: filterConditions,
        },
      },
      {
        $project: { firstName: 1, lastName: 1, email: 1, profileUrl: 1 },
      },
    ]);
    // Nếu không có người dùng phù hợp, lấy danh sách 15 người dùng ngẫu nhiên
    if (suggestedUsers.length === 0) {
      suggestedUsers = await Users.aggregate([
        { $match: { _id: { $nin: userFriends, $ne: userId } } },
        { $sample: { size: 15 } },
        { $project: { firstName: 1, lastName: 1, email: 1, profileUrl: 1 } },
      ]);
    }
    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const profileViews = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;
    const user = await Users.findById(id);
    user.views.push(userId);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const acceptRequest = async (req, res, next) => {
  try {
    const id = req.body.user.userId;
    const { rid, status } = req.body;
    const requestExist = await FriendsRequest.findById(rid);
    if (!requestExist) {
      next("No Friend Request Found.");
      return;
    }
    const newRes = await FriendsRequest.findByIdAndUpdate(
      { _id: rid },
      { requestStatus: status }
    );
    if (status === "Accepted") {
      const user = await Users.findById(id);
      user.friends.push(newRes?.requestFrom);
      await user.save();
      const friend = await Users.findById(newRes?.requestFrom);
      friend.friends.push(id);
      await friend.save();
    }
    res.status(201).json({
      success: true,
      message: "Friend Request " + status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
export const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;
  try {
    const verificationResult = await Verification.findOne({ userId });
    if (verificationResult) {
      const { expiresAt, token: hashedToken } = verificationResult;
      if (expiresAt < Date.now()) {
        console.log("Token has expired");
        await Verification.findOneAndDelete({ userId });
        await Users.findOneAndDelete({ _id: userId });
        const message = "Verification token has expired";
        return res.status(200).json({ status: "error", message });
      } else {
        const isMatch = await compareString(token, hashedToken);
        if (isMatch) {
          console.log("Token is a match");
          await Users.findOneAndUpdate({ _id: userId }, { verified: true });
          await Verification.findOneAndDelete({ userId });
          //const message = "Email verified successfully";
          return res.redirect("http://localhost:3000/login");
          // return res.status(200).json({
          //   status: "success",
          //   message,
          //   redirectTo: "http://localhost:3000/login",
          // });
        } else {
          const message = "Verification failed or link is invalid";
          //return res.status(200).json({ status: "error", message });
          return res
            .cookie("message", message)
            .redirect("http://localhost:3000/error");
        }
      }
    } else {
      const message = "Invalid verification link. Try again later";
      // return res.status(200).json({ status: "error", message });
      return res
        .cookie("message", message)
        .redirect("http://localhost:3000/error");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const requestPaswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "Email address not found",
      });
    }
    const existngRequest = await passwordReset.findOne({ email });
    if (existngRequest) {
      if (existngRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent to your email",
        });
      }
      await passwordReset.findOneAndDelete({ email });
    }
    await resetPasswordLink(user, res);
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  const { userId, token } = req.params;
  console.log("Reset password");
  try {
    //find record
    const user = await Users.findById(userId);
    console.log(user);
    if (!user) {
      const message = "Invalid password reset link .Try again";
      return res.status(404).json({
        success: "FAILED",
        message: message,
      });
    }
    const resetPassword = await passwordReset.findOne({ userId });

    if (!resetPassword) {
      const message = "Invalid password reset link .Try again";
      console.log(message);
      return res.status(404).json({
        success: "FAILED",
        message: message,
      });
      // return res
      //   .cookie("message", message)
      //   .redirect("http://localhost:3000/error");
      // res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }
    const { expiresAt, token: resetToken } = resetPassword;
    if (expiresAt < Date.now()) {
      const message = "Reset Password link has expired .please try again";
      console.log(message);
      return res.status(404).json({
        success: "FAILED",
        message: message,
      });
      // return res
      //   .cookie("message", message)
      //   .redirect("http://localhost:3000/error");
      // res.redirect(`/users/resetpassword?status=error&message=${message}`);
    } else {
      const isMatch = await compareString(token, resetToken);
      if (!isMatch) {
        const message = "Invalid reset password link .Please try again";
        console.log(message);
        return res.status(404).json({
          success: "FAILED",
          message: message,
        });
        // return res
        //   .cookie("message", message)
        //   .redirect("http://localhost:3000/error");
        // res.redirect(`/users/resetpassword?status=error&message=${message}`);
      } else {
        console.log("Reset sucess");
        res.status(201).json({
          success: "success",
        });
        // res.redirect(
        //   `/users/resetpassword?type=reset&status=success&id=${userId}`
        // );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const changePassword = async (req, res) => {
  try {
    console.log("change password");
    const { userId, password } = req.body;
    const hashedpassword = await hashString(password);
    const user = await Users.findByIdAndUpdate(
      { _id: userId },
      { password: hashedpassword }
    );
    if (user) {
      await passwordReset.findOneAndDelete({ userId });
      const message = "Password successfully reset";
      res.status(201).json({ success: "true", message: message });
      //res.redirect(`/users/resetpassword?status=success&message=${message}`);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "error", message: error.message });
  }
};
export const friendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    console.log(`friendrequest: userID:${userId}`);
    const createdBy = await Users.findById(userId);
    const { requestTo } = req.body;
    const requestExist = await FriendsRequest.findOne({
      requestTo,
      requestFrom: userId,
    });
    console.log("requestExist ");
    console.log(requestExist);
    if (requestExist) {
      next("Fiend request already sent.");
      return;
    }
    const newRes = await FriendsRequest.create({
      requestTo,
      requestFrom: userId,
    });
    const user_send = await Users.findById(userId);
    const notification = new Notification({
      userId: requestTo,
      content: `${user_send.lastName} ${user_send.firstName} send you a friend request`,
      createdBy,
    });
    await notification.save();
    res.status(201).json({
      success: true,
      message: "Fiend request successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
export const getFriendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const request = await FriendsRequest.find({
      requestTo: userId,
      requestStatus: "Pending",
    })
      .populate({
        path: "requestFrom",
        select: "fisrtName lastName profileUrl professtion -password",
      })
      .limit(10)
      .sort({
        _id: -1,
      });
    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;
    //console.log(req);
    const user = await Users.findById(id ?? userId).populate({
      path: "friends",
      select: "-password",
    });
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }
    user.password = undefined;
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, location, profileUrl, profession } = req.body;
    console.log("Profession", profession);
    if (!(firstName || lastName || profession || location)) {
      next("Please provide all required fields");
      return;
    }
    const { userId } = req.body.user;
    const updateUser = {
      firstName,
      lastName,
      location,
      profileUrl,
      profession,
      _id: userId,
    };
    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });
    await user.populate({ path: "friends", select: "-password" });
    const token = createJWT(user?._id);
    user.password = undefined;
    //console.log(user, "/n", token);
    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
