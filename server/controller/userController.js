import mongoose from "mongoose";
import Users from "../models/userModel.js";
import FriendsRequest from "../models/friendRequestModel.js";
import Verification from "../models/emailVerificationModel.js";
import { compareString, hashString } from "../untils/index.js";
import passwordReset from "../models/passwordResetModel.js";
import { resetPasswordLink } from "../untils/sendEmail.js";
export const unFriend = async (req, res) => {
  const { userId } = req.body.user;
  console.log(req.body)
  const { friendId } = req.body; 
  try {
      const user = await Users.findById(userId);
      const friend = await Users.findById(friendId);
      if (!user || !friend) {
          return res.status(404).json({
              success: false,
              message: "User or friend not found",
          });
      }
      user.friends = user.friends.filter(id => id.toString() !== friendId);
      await user.save();
      friend.friends = friend.friends.filter(id => id.toString() !== userId);
      await friend.save();
      return res.status(200).json({
          success: true,
          message: "Friend removed successfully",
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Internal server error.",
          error: error.message,
      });
  }
};

export const profileViews = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Kiểm tra xem userId đã có trong mảng views chưa
    if (!user.views.includes(userId)) {
      user.views.push(userId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile views updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const respondToFriendRequest = async (req, res, next) => {
  try {
    const requesterId = req.body.user.userId; 
    const { requestId, requestStatus } = req.body; 
    const friendRequest = await FriendsRequest.findById(requestId);
    if (!friendRequest) {
      return next("No Friend Request Found."); 
    }
    await FriendsRequest.findByIdAndUpdate(
      { _id: requestId },
      { requestStatus }
    );
    if (requestStatus === "Accepted") {
      const [user, friend] = await Promise.all([
        Users.findById(requesterId),
        Users.findById(friendRequest.requestFrom),
      ]);
     if (!user.friends.includes(friendRequest.requestFrom)) {
      user.friends.push(friendRequest.requestFrom); 
    }
    if (!friend.friends.includes(requesterId)) {
      friend.friends.push(requesterId);
    }
      await Promise.all([user.save(), friend.save()]); 
    } else {
      await FriendsRequest.findByIdAndDelete(requestId);
    }
    res.status(200).json({
      success: true,
      message: `Friend Request ${requestStatus}`, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Authentication error",
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
        return res.status(200).json({ status: "error", message, redirectTo: "/error" });
      } else {
        const isMatch = await compareString(token, hashedToken);
        if (isMatch) {
          console.log("Token is a match");
          await Users.findOneAndUpdate({ _id: userId }, { verified: true });
          await Verification.findOneAndDelete({ userId });
          const message = "Email verified successfully";
          return res.status(200).json({ status: "success", message, redirectTo: "/login" });
        } else {
          const message = "Verification failed or link is invalid";
          return res.status(200).json({ status: "error", message, redirectTo: "/error" });
        }
      }
    } else {
      const message = "Invalid verification link. Try again later";
      return res.status(200).json({ status: "error", message, redirectTo: "/error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body; // Lấy email từ yêu cầu.
    const user = await Users.findOne({ email }); // Tìm người dùng theo email.
    if (!user) {
      return res.status(404).json({ status: "FAILED", message: "Email address not found" });
    }
    const existingRequest = await passwordReset.findOne({ email }); // Kiểm tra yêu cầu đặt lại mật khẩu đã tồn tại.
    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({ status: "PENDING", message: "Reset password link has already been sent to your email" });
      }
      await passwordReset.deleteOne({ email }); // Xóa yêu cầu cũ nếu đã hết hạn.
    }
    await resetPasswordLink(user, res); // Gửi email với liên kết đặt lại mật khẩu.
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal server error." }); // Trả về lỗi 500 nếu có lỗi trong quá trình xử lý.
  }
};

export const resetPassword = async (req, res) => {
  const { userId, token } = req.params; // Lấy userId và token từ tham số URL.
  
  try {
    const user = await Users.findById(userId); // Tìm người dùng theo ID.
    if (!user) return res.status(404).json({ success: "FAILED", message: "Invalid password reset link. Try again" });
    const resetPasswordRequest = await passwordReset.findOne({ userId }); // Tìm yêu cầu đặt lại mật khẩu.
    if (!resetPasswordRequest || resetPasswordRequest.expiresAt < Date.now()) {
      return res.status(404).json({ success: "FAILED", message: "Invalid or expired password reset link. Try again" });
    }
    const isMatch = await compareString(token, resetPasswordRequest.token); // So sánh token với token trong yêu cầu.
    if (!isMatch) {
      return res.status(404).json({ success: "FAILED", message: "Invalid reset password link. Please try again" });
    }
    res.status(200).json({ success: "success" }); // Nếu mọi thứ hợp lệ, trả về thành công.
  } catch (error) {
    console.error(error); // Ghi lại lỗi.
    res.status(500).json({ message: "Internal server error." }); // Trả về lỗi 500 nếu có lỗi trong quá trình xử lý.
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, password } = req.body; // Lấy userId và password từ yêu cầu.
    const hashedPassword = await hashString(password); // Mã hóa mật khẩu mới.

    const user = await Users.findByIdAndUpdate(userId, { password: hashedPassword }); // Cập nhật mật khẩu trong cơ sở dữ liệu.
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" }); // Nếu người dùng không tồn tại, trả về lỗi.
    }

    await passwordReset.deleteOne({ userId }); // Xóa yêu cầu đặt lại mật khẩu sau khi cập nhật thành công.
    res.status(200).json({ success: true, message: "Password successfully reset" }); // Trả về phản hồi thành công.
  } catch (error) {
    console.error(error); // Ghi lại lỗi.
    res.status(500).json({ status: "error", message: error.message }); // Trả về lỗi 500 nếu có lỗi trong quá trình xử lý.
  }
};
export const friendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    console.log(`friendrequest: userID:${userId}`);
    const { recipientId } = req.body;
    const friendRequestData = {
      requestTo: recipientId,
      requestFrom: userId,
    };
    const existingRequest = await FriendsRequest.findOne(friendRequestData);
    console.log("existingRequest ");
    console.log(existingRequest);
    if (existingRequest) {
      next("Friend request already sent.");
      return;
    }
    const newFriendRequest = await FriendsRequest.create(friendRequestData);
    res.status(201).json({
      success: true,
      message: "Friend request successfully",
      newFriendRequest
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
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const requests = await FriendsRequest.find({
      requestTo: userId,
      requestStatus: "Pending",
    })
      .populate({
        path: "requestFrom",
        select: "-password", 
      })
      .sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching friend requests:", error); 
    return res.status(500).json({
      success: false,
      message: "Internal server error", 
      error: error.message,
    });
  }
};
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user; 
    const { userId: targetUserId } = req.params; 
    const user = await Users.findById(targetUserId ?? userId).populate({
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
export const updateUser = async (req, res) => {
    const { userId } = req.body.user;
    const updates = req.body; 
    const allowedUpdates = ['firstName', 'lastName', 'email', 'location', 'profileUrl', 'profession', 'workplace', 'birthDate'];
    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        Object.keys(updates).forEach((key) => {
            if (allowedUpdates.includes(key)) {
                user[key] = updates[key];
            }
        });
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
