import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true }, 
    description: { type: String, required: true },  
    image: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }],  
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    visibility: {
      type: String,
      enum: ['public', 'friends', 'onlyme', 'specific', 'draft','private'],
      default: 'public'  
    },
    specifiedUsers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    viewers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: { type: Number, default: 0 }},
  { timestamps: true }
);
const Posts = mongoose.model("Posts", postSchema);
export default Posts;
