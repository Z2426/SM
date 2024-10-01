import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comments" }, 
    replyId: { type: mongoose.Schema.Types.ObjectId },
    friendRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest" },
    viewed: { type: Boolean, default: false }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);
notificationSchema.index({ userId: 1, viewed: 1 });
notificationSchema.index({ createdAt: -1 });
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
