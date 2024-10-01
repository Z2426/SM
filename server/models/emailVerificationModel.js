import mongoose, { Schema } from "mongoose";
const emailVerificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true, 
  },
  token: {
    type: String,
    required: true, 
    unique: true, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  expiresAt: { 
    type: Date, 
    default: () => Date.now() + 3600000 
  },
});
emailVerificationSchema.index({ userId: 1 });
const Verification = mongoose.model("Verification", emailVerificationSchema);
export default Verification;
