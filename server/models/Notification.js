const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    type: String, 
    content: String, 
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, 
    friendRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'FriendRequest' }, 
    viewed: { type: Boolean, default: false }, 
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
