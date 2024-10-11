import nodemailer from "nodemailer";
import Verification from "../models/emailVerificationModel.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { hashString } from "./index.js";
import PasswordReset from "../models/passwordResetModel.js";
dotenv.config();
const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env; // not wokring
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTHE_EMAIL,
    pass: process.env.AUTHE_PASSWORD,
  },
});

export const sendVerificationEmail = async (user) => {
  const { _id, email, lastName } = user;
  const token = _id + uuidv4();
  const link = `${APP_URL}/users/verify/${_id}/${token}`;
  console.log(link)
  const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject: "Email verification",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome, ${lastName}!</h1>
          <p>Thank you for creating an account. Please verify your email address to complete the registration process.</p>
          <p>This verification link will expire in 1 hour.</p>
          <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Email Address And Go To Login Page</a>
          <p>If you didn't create this account, please ignore this email.</p>
          <p>Thank you!!!</p>
        </div>`,
  };
  try {
      const hashedToken = await hashString(token);
      await Verification.create({
          userId: _id,
          token: hashedToken,
          createAt: Date.now(),
          expiresAt: Date.now() + 3600000,
      });
      await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email.");
  }
};



export const resetPasswordLink = async (user, res) => {
  const { _id, email } = user;
  
  // Tạo token duy nhất
  const token = _id + uuidv4();
  const link = `$${APP_URL}/users/reset-password/${_id}/${token}`; // Tạo đường dẫn reset password
  console.log(`Reset link: ${link}`); // Ghi lại đường dẫn để kiểm tra
  
  // Tạo nội dung email
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Password Reset",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Password Reset</h1>
        <p>We received a request to reset your password. Please click the link below to reset your password:</p>
        <p><strong>This password reset link will expire in 10 minutes.</strong></p>
        <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Thank you,<br>Your Company Name</p>
      </div>
    `,
  };

  try {
    const hashedToken = await hashString(token); // Băm token để bảo mật
    const resetEmail = await PasswordReset.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(), // Sửa 'createAt' thành 'createdAt'
      expiresAt: Date.now() + 600000, // Thời gian hết hạn là 10 phút
    });

    // Nếu tạo yêu cầu đặt lại mật khẩu thành công, gửi email
    if (resetEmail) {
      await transporter.sendMail(mailOptions); // Gửi email
      return res.status(201).send({
        success: "PENDING",
        message: "Reset Password Link has been sent to your account",
      });
    }
  } catch (error) {
    console.error(error); // Ghi lại lỗi để kiểm tra
    return res.status(500).json({ message: "Something went wrong" }); // Trả về lỗi 500 cho các lỗi server
  }
};
