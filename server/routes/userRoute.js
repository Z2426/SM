import { verify } from "crypto"
import express from "express"
import path from "path"
import { verifyEmail } from "../controller/userController.js"
const router =express.Router()
const __dirname =path.resolve(path.dirname(""))
router.get("/verify/:userId/:token",verifyEmail)
router.get("/verified",(req,res)=>{
    res.sendFile(path.join(__dirname),"./view/verifieldpage.html")
})
export default router