import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoute.js";
import postRoute from "./postRoutes.js";
const router = express.Router();
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);
router.get("/", (req, res) => {
  res.send("HAVE A NICE GOOD DAY");
});
export default router;
