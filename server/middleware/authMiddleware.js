import JWT from "jsonwebtoken"
import Users from "../models/userModel.js";
import { createConnection } from "mongoose";
import { createJWT } from "../untils/index.js";
export const userAuth = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
      next("Authentication== failed");
    }
  
    const token = authHeader?.split(" ")[1];
  
    try {
      const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
  
      req.body.user = {
        userId: userToken.userId,
      };
  
      next();
    } catch (error) {
      console.log(error);
      next("Authentication failed");
    }
};
