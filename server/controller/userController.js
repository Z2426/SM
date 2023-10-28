import mongoose from "mongoose";
import Users from '../models/userModel.js'
import Verification from "../models/emailVerificationModel.js";
import {compareString} from "../untils/index.js"
import {passwordReset} from "../models/passwordResetModel.js"
export const verifyEmail = async (req, res) => {
    const { userId, token } = req.params;

    try {
        const verificationResult = await Verification.findOne({ userId });

        if (verificationResult) {
            const { expiresAt, token: hashedToken } = verificationResult;

            if (expiresAt < Date.now()) {
                console.log("Token has expired");
                await Verification.findOneAndDelete({ userId });
                await Users.findOneAndDelete({ _id: userId });

                const message = "Verification token has expired";
                return res.redirect(`/users/verified?status=error&message=${message}`);
            } else {
                const isMatch = await compareString(token, hashedToken);

                if (isMatch) {
                    console.log("Token is a match");
                    await Users.findOneAndUpdate({ _id: userId }, { verified: true });
                    await Verification.findOneAndDelete({ userId });

                    const message = "Email verified successfully";
                    return res.redirect(`/users/verified?status=success&message=${message}`);
                } else {
                    const message = "Verification failed or link is invalid";
                    return res.redirect(`/users/verified?status=error&message=${message}`);
                }
            }
        } else {
            const message = "Invalid verification link. Try again later";
            return res.redirect(`/users/verified?status=error&message=${message}`);
        }
    } catch (error) {
        console.log(error);
        return res.redirect(`/users/verified?message=`);
        // You can also handle the error with a proper response status or JSON message if needed.
    }
};
export const requestPaswordReset =async(req,res)=>{
    try{
        const {email} =req.body
        const user =await Users.findOne({email})
        if(!user){
            return res.status(404).json({
                status:"FAILED",
                message:"Email address not found"
            })
        }
        const existingRequest =await passwordReset.findOne({email})
       if(existingRequest){
        if(existingRequest.expiresAt >Date.now()){
            return res.status(201).json({
                status:"PENDING",
                message:"Reset password link has already been sent to your email"
            })

        }
        await passwordReset.findOneAndDelete({email})

       }
       await resetPasswordLink(user,res)

    }catch(error){
        console.log(error)
        res.status(404).json({message:error,message})
    }
}