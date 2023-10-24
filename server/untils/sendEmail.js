import nodemailer from "nodemailer"
import Verification from "../models/emailVerificationModel.js"
import dotenv from "dotenv"
import {  v4  as uuidv4} from "uuid"
import { hashString } from "./index.js"


dotenv.config()
const {AUTH_EMAIL,AUTH_PASSWORD,APP_URL} =process.env
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user:AUTH_EMAIL,
        pass:AUTH_PASSWORD
    }
})

export const sendVerificationEmail= async(user,res)=>{
    const {_id,email,lastName} =user
    const token =_id+uuidv4()
    const link =APP_URL+"users/verify"+_id+"/"+token
    //mail options
    const mailOptions={
        from : AUTH_EMAIL,
        to:email,
        subject:"Email verification",
        html:`<div> <h1>OKE</h1> </div>`
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