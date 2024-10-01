import mongoose, { Schema } from "mongoose";
const replySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  from: { type: String, required: true }, 
  comment: { type: String, required: true }, 
  likes: [{ type: Schema.Types.ObjectId, ref: "Users" }], 
}, { timestamps: true });

const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true }, 
    postId: { type: Schema.Types.ObjectId, ref: "Posts", required: true }, 
    comment: { type: String, required: true }, 
    from: { type: String, required: true },
    replies: [replySchema], 
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }], 
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
