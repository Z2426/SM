import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoute.js";
import postRoute from "./postRoutes.js";
import notificationRoute from "./notification.js";
import adminRoute from "./adminRoutes.js";
import messageRoutes from "./messageRoutes.js";
import testRoutes from "./testRoutes.js";
const router = express.Router();
router.use("/auth", authRoute); // auth: register , login
router.use("/users", userRoute);
router.use("/posts", postRoute);
// router.use("/admin", adminRoute) // skip
router.use("/message", messageRoutes);
router.use("/test", testRoutes); //skip
router.use("/notifications", notificationRoute);
router.get("/", (req, res) => {
  res.send("Welcome fen");
});
export default router;
