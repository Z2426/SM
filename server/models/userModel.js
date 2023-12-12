import mongoose, { Schema } from "mongoose";
//SChema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "First Name is Require!"]
    },
    lastName: {
        type: String,
        require: [true, "Last Name is required"]
    },
    email: {
        type: String,
        require: [true, "Email is required !"]
    },
    password: {
        type: String,
        require: [true, "Passwords is required"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true
    },
    location: { type: String },
    profileUrl: { type: String },
    professtion: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: [{ type: String }],
    verified: { type: Boolean, default: false },
    birthDate: { type: Date },
    workplace: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    role: {
        type: String,
        default: 'User'
    },
    statusActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
}
)
const Users = mongoose.model("Users", userSchema)
export default Users