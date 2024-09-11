import mongoose, { Schema } from "mongoose"
const ConversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    }
  ],
}, { timestamps: true });
const conservation = mongoose.model('Conversation', ConversationSchema)
export default conservation