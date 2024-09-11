import express from "express"
import { login, register } from "../controller/autheController.js"
const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/", (req, res) => {
    res.send("authroute")
})
export default router