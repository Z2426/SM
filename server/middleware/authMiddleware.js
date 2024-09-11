import JWT from "jsonwebtoken";
import Users from "../models/userModel.js";
import { createJWT } from "../untils/index.js";
export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.body.user.userId;
    const user = await Users.findById(userId);
    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        status: "failed",
        message: "Access denied! Admin privileges required.",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error!",
    });
  }
};
export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        status: "failed",
        message: "Authentication failed",
      });
      // const message = "Authentication failed";
      // return res
      //   .cookie("message", message)
      //   .redirect("http://localhost:3000/error");
    }
    const token = authHeader.split(" ")[1];
    var userToken = {};
    try {
      userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "failed",
          message: "Token has expired. Please log in again",
        });

        const message = "Token has expired. Please log in again";
        // return res
        //   .cookie("message", message)
        //   .redirect("http://localhost:3000/error");
        //return res.redirect("https://www.google.com/");
      }
      console.error(error);
      // const message = "Authentication failed";
      // return res
      //   .cookie("message", message)
      //   .redirect("http://localhost:3000/error");
      return res.status(401).json({
        status: "failed",
        message: "Authentication failed",
      });
    }

    const user = await Users.findById(userToken.userId);
    if (!user || !user.statusActive) {
      const message =
        "Authentication failed because the account has been blocked or does not exist";
      // return res
      //   .cookie("message", message)
      //   .redirect("http://localhost:3000/error");
      return res.status(401).json({
        status: "failed",
        message:
          "Authentication failed because the account has been blocked or does not exist",
      });
    }

    req.body.user = {
      userId: userToken.userId,
    };

    console.log(`Authentication successful for user: ${req.body.user.userId}`);
    next();
  } catch (error) {
    console.error(error);
    const message = "Authentication failed";
    // return res
    //   .cookie("message", message)
    //   .redirect("http://localhost:3000/error");
    return res.status(401).json({
      status: "failed",
      message: "Authentication failed",
    });
  }
};
