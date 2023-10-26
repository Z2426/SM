import { verify } from "crypto"
import express from "express"
import path from "path"
import  verifyEmail  from "../models/emailVerificationModel.js"
const router =express.Router()
const __dirname =path.resolve(path.dirname(""))
router.get("/verify/:userId/:token",verifyEmail)
router.get("/verify",(req,res)=>{
    //res.send("123")
    console.log(__dirname+"./view/verifieldpage.html")
     res.sendFile(path.join(__dirname,'views', 'verifiedpage.html'))
   // res.sendFile(path.join(__dirname),"./view/verifieldpage.html")
})
router.get('/',(req,res)=>{
    res.send("userRoute")
})
export default router