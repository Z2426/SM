import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    description: { type: String, required: true },
    image: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    status: { type: String, enum: ['public', 'private', 'draft'], default: 'public' },
    viewers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);
const Posts = mongoose.model("Posts", postSchema);
export default Posts;
