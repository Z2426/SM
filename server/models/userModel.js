import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Passwords is required"],
        minlength: [6, "Password length should be greater than 6 characters"],
        select: false
    },
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    views: [{ type: Schema.Types.ObjectId, ref: 'Users' }], // Nếu views là bài viết hoặc các đối tượng khác
    verified: { type: Boolean, default: false },
    birthDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value < Date.now();
            },
            message: "Birth date cannot be in the future!"
        }
    },
    workplace: { type: String },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    statusActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexing
userSchema.index({ email: 1 });
userSchema.index({ statusActive: 1 });

const Users = mongoose.model("Users", userSchema);
export default Users;
