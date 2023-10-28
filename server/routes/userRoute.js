import { verify } from "crypto"
import express from "express"
import path from "path"
import  {requestPaswordReset, verifyEmail,resetPassword,changePassword}  from "../controller/userController.js"
import { resetPasswordLink } from "../untils/sendEmail.js"
const router =express.Router()
const __dirname =path.resolve(path.dirname(""))

//Password reset
router.get("/reset-password/:userId/:token",resetPassword)
router.post('/request-passwordreset',requestPaswordReset)
router.post("/reset-password",changePassword)


router.get("/verify/:userId/:token",verifyEmail)
//bug : not verified data html
router.get("/verified",(req,res)=>{
    //res.send("123")
    
     res.sendFile(path.join(__dirname,'views', 'verifiedpage.html'))
   // res.sendFile(path.join(__dirname),"./view/verifieldpage.html")
})
router.get("/resetpassword",(req,res)=>{
    //res.send("123")
    
     res.sendFile(path.join(__dirname,'views', 'verifiedpage.html'))
   // res.sendFile(path.join(__dirname),"./view/verifieldpage.html")
})
router.get('/',(req,res)=>{
    res.send("userRoute")
})
export default router