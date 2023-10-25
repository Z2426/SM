import mongoose from "mongoose";
import Verification from "../models/emailVerificationModel";
import { verify } from "jsonwebtoken";
import Users from "../models/userModel";
import {compareString} from "../untils/index.js"
import { compare } from "bcryptjs";
export const verifyEmail = async(req,res)=>{
    const {userId,token}=req.params
    try{
        const result =await Verification.findOne({userId})
        if(result){
            const {expiresAt,token:hashedToken}=result
            //token has expires
            if(expiresAt < Date.now()){
               await Verification.findOneAndDelete({userId})
               .then(()=>{
                Users.findByIdAndDelete({_id:userId})
                .then(()=>{
                    `/users/verified?status=error&message=${message}`

                })
               }).catch((error)=>{
                console.log(error)
                res.redirect('/users/verified?status=error&message=')
               })
            }else{
                compareString(token,hashedToken).then(
                    (isMatch)=>{
                        if(isMatch){
                            Users.findOneAndUpdate({_id:userId},{verified:true})
                            .then(()=>{
                                const message ="Email verified successfully"
                                res.redirect(
                                    `/users/verified?status=success&message=${message}`
                                )
                            }).catch((err)=>{
                                console.log(err)
                                const message ="Verificarion failed or link us invalid"
                                res.redirect(
                                    `/users/verified?status=error&message=${message}`
                                )
                            })
                            

                        }else{
                            //invalid token
                            const message ="Verification failed or link is inalid"
                            res.redirect(`/users/erified?status=error&message=${message}`)

                        }

                    }
                ).catch((error)=>{
                    console.log(error)
                    res.redirect(`/users/verified?message`)
                })

            }
        }else{
            const message ="Invalid verification link .try again later"
            res.redirect(`/users/verified?status=errror&message=${message}`)

        }


    }catch(error){
        console.log(error)
        res.status(404).json({message:error.message})
    }

}