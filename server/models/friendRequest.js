import mongoose, { Schema } from "mongoose"
const requestSchema = Schema({
    requestTo: { type: Schema.Types.ObjectId, ref: "Users" },
    requestFrom: { type: Schema.Types.ObjectId, ref: "Users" },
    requestStatus: { type: String, default: "Pending" }

}, {
    timestamp: true
})
const FriendsRequest = mongoose.model("FriendRequest", requestSchema)
export default FriendsRequest