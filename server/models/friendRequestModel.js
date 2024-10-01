import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
    requestTo: { 
        type: Schema.Types.ObjectId, 
        ref: "Users", 
        required: true 
    },
    requestFrom: { 
        type: Schema.Types.ObjectId, 
        ref: "Users", 
        required: true 
    },
    requestStatus: { 
        type: String, 
        default: "Pending" 
    }
}, {
    timestamps: true 
});
requestSchema.index({ requestTo: 1, requestFrom: 1 });
const FriendRequest = mongoose.model("FriendRequest", requestSchema);
export default FriendRequest;
