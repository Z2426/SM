import JWT from "jsonwebtoken";
import Users from "../models/userModel.js";
export const userAuth = async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({
              status: "failed",
              message: "Authentication failed: No token provided"
          });
      }
      const token = authHeader.split(" ")[1];
      let userToken;
      try {
          userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
      } catch (error) {
          if (error.name === "TokenExpiredError") {
              return res.status(401).json({
                  status: "failed",
                  message: "Token has expired. Please log in again"
              });
          }
          console.error("Token verification error:", error);
          return res.status(401).json({
              status: "failed",
              message: "Authentication failed: Invalid token"
          });
      }
      const user = await Users.findById(userToken.userId);
      if (!user || !user.statusActive) {
          return res.status(401).json({
              status: "failed",
              message: "Authentication failed: Account is blocked or does not exist"
          });
      }
      req.body.user = {
          userId: userToken.userId,
      };

      console.log(`Authentication successful for user: ${req.body.user.userId}`);
      next();
  } catch (error) {
      console.error("Authentication middleware error:", error);
      return res.status(401).json({
          status: "failed",
          message: "Authentication failed"
      });
  }
};
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
