import Users from '../models/userModel.js'
import  { compareString,hashString, createJWT } from '../untils/index.js'
import {sendVerificationEmail} from '../untils/sendEmail.js'
export const register =async (req,res,next)=>{
    const {firstName,lastName,email,password}=req.body
    if(!(firstName ||lastName||email||password)){
        next("Provide required filed!")
        return
    }
    try{
        const userExist =await Users.findOne({email})
        if(userExist){
            next("Email adress already exists")
            return
        }
        const hashedPassowrd =await hashString(password)
        const user =await Users.create({
            firstName,
            lastName,
            email,
            password:hashedPassowrd
        })
        sendVerificationEmail(user,res)

    }catch(e){
        console.log(e)
        res.status(404).json({message: e.message})
    }

}
export const login =async(req,res,next)=>{
    const {email,password} =req.body
    try{
        if(!email || !password){
            next("Please Provide User credentials")
            return
        }
        const user = await Users.findOne({ email })
        .select('+password')
        .populate({
            path: "friends",
            select: "firstName lastName location profileUrl -password"
        });
    
        if(!user){
            next("Inalid email or password")
            return
        }
        if(!user?.verified){
            next("User email is not verified.chekc your email account and verify your email")
            return
        }
        const isMatch =await compareString(password,user?.password)
        if(!isMatch){
            next("Invalid email or password")
            return
        }
        user.password=undefined
        const token =createJWT(user?._id)
        res.status(201).json({
            success:true,
            message:"Login successfully",
            user,
            token
        })

    }catch(error){
        console.log(error)
        res.status(404).json({message:error.message})
    }
}