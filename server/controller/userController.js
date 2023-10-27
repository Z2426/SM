import mongoose from "mongoose";
import Users from '../models/userModel.js'
import Verification from "../models/emailVerificationModel.js";
import {compareString} from "../untils/index.js"
/*
export const verifyEmail = async(req,res)=>{
    
    const {userId,token} =req.params
    try{
        const result =await Verification.findOne({userId})
        if(result){
            const {expiresAt,token :hashedToken} =result
            //token has expires
            if(expiresAt <Date.now()){
                console.log("token has expires")
                await Verification.findOneAndDelete({userId}).then(()=>{
                    Users.findOneAndDelete({_id:userId})
                    .then(()=>{
                        const message="Verification token has expired"
                        res.redirect(
                            `/users/verified?status=error&message=${message}`
                        )

                    }).catch((err)=>{
                        res.redirect(`/users/verified?status=error&message=`)
                    })

                }).catch((err)=>{
                    res.redirect(`/users/verified?message=${err}`)
                })
            }else{
                //token valid
                compareString(token,hashedToken)
                .then((isMatch)=>{
                    if(isMatch){
                        console.log("is match success")
                        Users.findOneAndUpdate({_id:userId},{verified:true})
                        .then(()=>{
                            Verification.findOneAndDelete({userId}).then(()=>{
                                const message ="Email verified succesfully"
                                res.redirect(
                                    `/users/verified?status=success&message=${message}`
                                )
                            })

                        }).catch((err)=>{
                            console.log("is match"+err)
                            const message ="Verificaion failed or link invalid"
                            res.redirect(
                                `/users/verified?status=error&message=${message}`
                            )
                        })

                    }else{
                        //invalid token
                        const message ="Verificarion failed or link is invalid"
                        res.redirect(`/users/verified?status=error&message=${message}`)

                    }

                }).catch((error)=>{
                    console.log(error)
                    res.redirect(`/users/verified?message=`)

                })
            }
        }else{
            const message="Invalid verification link. Try again later"
            res.redirect(`/users/verified?status=error&message=${message}`)
        }
    }catch(error){
        console.log(error)
        res.redirect(`/users/verified?message=`)
        //res.status(404).json({message:error.message})

    }
}
*/
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