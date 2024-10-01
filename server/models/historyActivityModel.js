import mongoose from "mongoose";

const historyActivitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true, // Ensure that userId is provided
        },
        type: {
            type: String,
            enum: ["login", "logout", "post", "like", "comment"],
            required: true, // Ensure that type is provided
        },
        message: {
            type: String,
            required: true, // Optionally make message required or provide a default
            trim: true, // Remove any leading or trailing whitespace
        },
    },
    { timestamps: true }
);

// Adding indexes for optimization
historyActivitySchema.index({ userId: 1, type: 1 });

const HistoryActivity = mongoose.model("HistoryActivity", historyActivitySchema);
export default HistoryActivity;
