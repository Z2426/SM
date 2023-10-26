import express from "express"
import authRoute from "./authRoutes.js"
import userRoute from './userRoute.js'
const router =express.Router()
router.use('/auth',authRoute)// auth: register , login
router.use('/users',userRoute)
export default router