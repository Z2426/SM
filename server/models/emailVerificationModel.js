import mongoose, { Schema } from "mongoose"
const emailVerificationSchema = Schema({
  userId: String,
  token: String,
  createAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => Date.now() + 3600000 },
})
const Verification = mongoose.model("Verification", emailVerificationSchema)
export default Verification