import JWT from "jsonwebtoken";
import Users from "../models/userModel.js";
export const checkTokenValid = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    //console.log(authHeader, "na ni");
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        status: "failed",
        message: "please check token on postman",
      });
    }
    const token = authHeader.split(" ")[1];
    var userToken = {};
    try {
      userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
      return res.status(200).json({
        status: "success",
        message: "Token is active",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "failed",
          message: "Token has expired",
        });
      }
      console.error(error);
      return res.status(401).json({
        status: "failed",
        message: error,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: "failed",
      message: error,
    });
  }
};
