import mongoose from "mongoose";
import Users from '../models/userModel.js'
import FriendsRequest from  '../models/friendRequest.js'
import Verification from "../models/emailVerificationModel.js";
import {compareString, hashString} from "../untils/index.js"
import passwordReset from "../models/passwordResetModel.js"
import {resetPasswordLink} from "../untils/sendEmail.js"
import { createJWT } from "../untils/index.js";
export const suggestedFriends_v1 = async (req, res) => {
  try {
    const { userId } = req.body.user;

    let queryObject = {};

    queryObject._id = { $ne: userId };

    queryObject.friends = { $nin: userId };

    let queryResult = Users.find(queryObject)
      .limit(15)
      .select("firstName lastName profileUrl profession -password");

    const suggestedFriends = await queryResult;

    res.status(200).json({
      success: true,
      data: suggestedFriends,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};