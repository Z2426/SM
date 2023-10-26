import nodemailer from "nodemailer"
import Verification from "../models/emailVerificationModel.js"
import dotenv from "dotenv"
import {  v4  as uuidv4} from "uuid"
import { hashString } from "./index.js"


dotenv.config()
const {AUTH_EMAIL,AUTH_PASSWORD,APP_URL} =process.env // not wokring

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user:"nguyenvanban9923@gmail.com",
        pass:'tqmj hzgo pvha rcvt'
    }
})

export const sendVerificationEmail= async(user,res)=>{
    const {_id,email,lastName} =user
    const token =_id+uuidv4()
    console.log("Test app url",APP_URL)
    console.log(user)
    const link =APP_URL+"/users/verify/"+_id+"/"+token
    console.log("Link verify ",link)
    //mail options
    const mailOptions={
        from : AUTH_EMAIL,
        to:email,
        subject:"Email verification",
        html:`<div>
         <h1>${lastName}</h1>
         <p>Please verify your email address so we can know that really you</p>
         <p>This link expire  1 hour</p>
         <p>${link}</p>
         <a href=${link}>Email address<a/>
         </div>` 
    }
    try{
        const hashedToken =await hashString(token)
        const newVerifiedEmail =await Verification.create({
            userId:_id,
            token:hashedToken,
            createAt:Date.now(),
            expiresAt:Date.now()+360000
        })
        if(newVerifiedEmail){
            transporter.sendMail(mailOptions)
            .then(()=>{
                res.status(201).send({
                    success:"PENDING",
                    message:"Verification email has been sent to your account"
                })
            })
        }

    }catch(e){
        console.log(e)
        res.status(404).json({message:"Something went wrong"})
    }
}