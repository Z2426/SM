import mongoose, { Schema } from "mongoose"

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversations',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  text: {
    type: String,
  },
}, { timestamps: true });

const message = mongoose.model('Message', MessageSchema);
export default message