import express from "express"
import {checkTokenValid} from "../controller/testController.js"
const router = express.Router()
router.get("/token-valid",checkTokenValid)
export default router