import mongoose from "mongoose";
import Verification from "../models/emailVerificationModel.js";
import {compareString} from "../untils/index.js"
export const verifyEmail = async(req,res)=>{
    
    const {userId,token} =req.params
    try{
        const result =await Verification.findOne({userId})
        if(result){
            const {expiresAt,token:hashedToken}=result
            //token has expires
            if(expiresAt < Date.now()){
               await Verification.findOneAndDelete({userId})
               .then(()=>{
                const message ="Verification roken has expired"
                res.redirect(`
                /users/verified?status=error&message=${message}`
                )
               }).catch((error)=>{
                console.log(error)
                res.redirect('/users/verified?status=error&message=')
               })


            }else{
                //token valid
                compareString(token,hashedToken)
                .then((isMatch)=>{
                    if(isMatch){
                         Users.findOneAndDelete({_id:userId},{verified:true})
                         .then(()=>{
                            const message ="Email verified successfully"
                            res.redirect(
                                `/users/verified?status=success&message=${message}`
                            )
                         }).catch((err)=>{
                            console.log(err)
                            const message ="Verification failed or link is invalid"
                            res.redirect(`
                            /users/verified?status=error&message=${message}`)
                         })

                    }else{
                        //invalid toekn
                        const message ="Vrification failed or lonk in invalid"
                        res.redirect(`/users/verified?status=error&message=${message}`)

                    }

                }).catch((error)=>{
                    console.log(error)
                    res.redirect(`/users/verified?message=`)
                })
            }
        }else{
            const message ="invalid verification link .Try again later"
            res.redirect(`/users/verified?status=error&message=${message}`)
        }

    }catch(error){
        console.log(error)
        res.status(404).json({message: error.message})

    }
    
}