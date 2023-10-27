import mongoose from "mongoose";
import Users from '../models/userModel.js'
import Verification from "../models/emailVerificationModel.js";
import {compareString} from "../untils/index.js"

export const verifyEmail = async(req,res)=>{
    
    const {userId,token} =req.params
   
    
        
    try{
        const result =await Verification.findOne({userId})
        if(result){
            const {expiresAt,token :hashedToken} =result
            //token has expires
            if(expiresAt <Date.now()){
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
                    res.redirect(`/users/verified?message=`)
                })
            }else{
                //token valid
                compareString(token,hashedToken)
                .then((isMatch)=>{
                    if(isMatch){
                        Users.findOneAndUpdate({_id:userId},{verified:true})
                        .then(()=>{
                            Verification.findOneAndDelete({userId}.then(()=>{
                                const message ="Email verified succesfully"
                                res.redirect(
                                    `/users/verified?status=success&message=${message}`
                                )
                            }))

                        }).catch((err)=>{
                            console.log(err)
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