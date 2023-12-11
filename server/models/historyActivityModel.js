import mongoose, { Schema } from "mongoose";
const historyActivitySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        type: {
            type: String,
            enum: ["login", "logout", "post", "like", "comment"],
            required: true,
        },
        message: String,
    },
    { timestamps: true }
)
const historyActivity = mongoose.model("historyActivity", historyActivitySchema)
export default historyActivity