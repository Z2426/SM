import mongoose from "mongoose";
import Users from '../models/userModel.js'
import FriendsRequest from  '../models/friendRequest.js'
import Verification from "../models/emailVerificationModel.js";
import {compareString, hashString} from "../untils/index.js"
import passwordReset from "../models/passwordResetModel.js"
import {resetPasswordLink} from "../untils/sendEmail.js"
import { createJWT } from "../untils/index.js";
export const suggestedFriends =async(req,res,next)=>{
  try{
    const {userId} =req.body.user
    let queryObject ={}
    queryObject._id={$ne:userId}
    queryObject.friend={$nin:userId}
    let queryResult =Users.find(queryObject)
    .limit(15)
    .select("firstName lastName profuleUrl profession -password")
    const suggestedFriends =await queryResult
    res.status(200).json({
        success:true,
        data:suggestedFriends
    })


  }catch(error){
    console.log(error)
    res.status(404).json({message:error.message})
  }
}
export const profileViews =async(req,res,next)=>{
  try{
    const {userId} =req.body.user
    const {id} =req.body
    const user =await  Users.findById(id)
    user.views.push(userId)
    await user.save()
    res.status(201).json({
        success :true,
        message:"Successfully"
,
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
        message:"auth error",
        success:false,
        error: error.message
    })
  }
}
export const acceptRequest =async(req,res,next)=>{
   try{
    const id =req.body.user.userId
    const {rid,status} =req.body
    const requestExist =await FriendsRequest.findById(rid)
    if(!requestExist){
        next("No friend request found")
        return
    }
    const newRes =await FriendsRequest.findByIdAndUpdate(
        {_id:rid},
        {requestStatus:status})
    if(status ==="Accept"){
       const user =await  Users.findById(id)
       user.friends.push(newRes?.requestFrom)
       await user.save()
       const friend =await Users.findById(newRes?.requestFrom)
       friend.friends.push(newRes?.requestTo)
       await friend.save()
    }
    res.status(201).json({
        success:true,
        message:"Friend Request" +status
    })
   }catch(error){
    console.log(error)
    res.status(500).json({
        message:"auth error",
        success:false,
        error:error.message
    })

   }
}
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
    const existngRequest = await passwordReset.findOne({email})
    if(existngRequest){
        if(existngRequest.expiresAt > Date.now()){
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
    res.status(404).json({message:error.message})

   }
}
export const resetPassword=async(req,res)=>{
    const {userId,token} =req.params
    try{
        //find record
        const user =await Users.findById(userId)
        if(!user){
            const message="Invalid password reset link .Try again"
            res.redirect(`
            /users/resetpassword?type=reset&status=error&message=${message}
            `)
        }
        const resetPassword =await passwordReset.findOne({userId})
        if(!resetPassword){
            const message="Invalid password reset link .Try again"
            res.redirect(`/users/resetpassword?status=error&message=${message}`)
        }
        const {expiresAt,token:resetToken}=resetPassword
        if(expiresAt <Date.now()){
            const message ="Reset Password link has expired .please try again"
            res.redirect(`/users/resetpassword?status=error&message=${message}`)
        }else{
            const isMatch= await compareString(token,resetToken)
            if(!isMatch){
                const message ="Invalid reset password link .Please try again"
                res.redirect(`/users/resetpassword?status=error&message=${message}`)
            }else{
                res.redirect(`/users/resetpassword?type=reset&id=${userId}`)
            }
        }


    }catch(error){
        console.log(error)
        res.status(404).json({message:error.message})
    }

}
export const changePassword=async(req,res)=>{
    try{
      const {userId,password} =req.body
      const hashedpassword= await hashString(password)
      const user =await Users.findByIdAndUpdate({_id:userId},{password:hashedpassword})
      if(user){
        await passwordReset.findOneAndDelete({userId})
        const message="Password successfully reset"
        res.redirect(
            `/users/resetpassword?status=success&message=${message}`
        )
        return
      }
    }catch(error){
        console.log(error)
        res.status(404).json({message:error.message})
    }
    
}
export const friendRequest =async(req,res,next)=>{
    try{
        const {userId} =req.body.user
        const {requestTo}=req.body
        const requestExist =await FriendsRequest.findOne({
            requestTo:userId,
            requestTo
        })
        if(requestExist){
            next("Fiend request already sent.")
            return
        }
        const accountExist =await FriendsRequest.findOne({
            requestFrom:requestTo,
            requestTo:userId
        })
        if(accountExist){
            next("Friend request aleady sent")
            return
        }
        const newRes =await FriendsRequest.create({
            requestTo,
            requestFrom:userId
        })


        res.status(201).json({
            success:true,
            message:"Fiend request successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"auth error",
            success: false,
            error:error.message
        })
    }
}
export const getFriendRequest =async(req,res,next)=>{
 try{
    const {userId} =req.body.user
    const request =await FriendsRequest.find({
        requestTo:userId,
        requestStatus:"Pending"
    }).populate({
        path:"requestFrom",
        select:"fisrtName lastName profileUrl professtion -password"

    }).limit(10)
    .sort({
        _id:-1
    })
    res.status(200).json({
        success :true,
        data:request
    })
    

 }catch(error){
    console.log(error)
    res.status(500).json({
        message:"auth error",
        success :false,
        error:error.message
    })
 }
}
export const getUser =async (req,res,next)=>{
    try{
        const {userId} =req.body.user
        const {id} =req.params
        const user =await Users.findById(id??userId).populate({
            path:"friends",
            select:"-password"
        })
        if(!user){
            return res.status(200).send({
                message:"User not found",
                success:false
            })
        }
        user.password =undefined
        res.status(200).json({
            success:true,
            user:user
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"auth error",
            success: false,
            error: error.message
        })
    }
}

export const updateUser = async (req, res, next) => {
    try {
      const { firstName, lastName, location, profileUrl, profession } = req.body;
  
      if (!(firstName || lastName  || profession || location)) {
        next("Please provide all required fields");
        return;
      }
  
      const { userId } = req.body.user;
  
      const updateUser = {
        firstName,
        lastName,
        location,
        profileUrl,
        profession,
        _id: userId,
      };
      const user = await Users.findByIdAndUpdate(userId, updateUser, {
        new: true,
      });
  
      await user.populate({ path: "friends", select: "-password" });
      const token = createJWT(user?._id);
  
      user.password = undefined;
  
      res.status(200).json({
        sucess: true,
        message: "User updated successfully",
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };

  