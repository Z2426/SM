import mongoose ,{Schema} from "mongoose"
const passwordRestSchema =Schema({
    userId:{type:String, unique:true},
    email:{type:Strng ,unique:true},
    token:String,
    createAt:Date,
    expiresAt:Date
})
const passwordReset =mongoose.model("PasswordReset",passwordRestSchema)
export default passwordReset