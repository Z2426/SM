import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversations',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true, 
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });
MessageSchema.index({ conversationId: 1, sender: 1, recipient: 1 });
const Message = mongoose.model('Message', MessageSchema);
export default Message;
