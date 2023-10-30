import Posts  from "../models/postModel.js"
import Users from "../models/userModel.js"
export const getPosts =async(req,res,next)=>{
    try{
        const {userId} =req.body.user
        const {search} =req.body
        const user =await Users.findById(userId)
        const friends =user?.friends?.toString().split(",")??[]
        friends.push(userId)
        const searchPostQuery ={
            $or:[
                {
                    descripttion:{$regex:search,$options:"i"}
                }
            ]
        }
        const posts =await Posts.find(search?searchPostQuery:{})
        .populate({
            path:"userId",
            select:"firstName lastName location profileUrl -password"
        }).sort({_id:-1})
        const friendsPosts =posts?.filter((post)=>{
            return friends.includes(post?.userId?._id.toString())
        })
        const otherPosts =posts?.filter((post)=>!friends.includes(post?.userId._id.toString())
        )
        let postsRes= null
        if(friendsPosts?.length>0){
            postsRes =search?friendsPosts:{...friendsPosts,...otherPosts}
        }else{
            postsRes=posts
        }
        res.status(200).json({
            success:true,
            message:"successfully",
            data:postsRes
        })

    }catch(error){
        console.log(error)
        res.status(404).json({message: error.mesage})
    }
}
export const createPost =async(req,res,next)=>{
    try{
        
        const {userId}=req.body.user
        const {descripttion,image} =req.body
        if(!descripttion){
            next("You must provide a decription")
            return
        }
        const post =await Posts.create({
            userId,
            descripttion,
            image
        })
        res.status(200).json({
            success:true,
            message:"Post created successfully",
            data:post
        })


    }catch(err){
        console.log(err)
        res.status(404).json({mesage :err.mesage})
    }
}