import { Schema, model } from "mongoose";
import { IOtp } from "./otp.interface";

const otpSchema = new Schema<IOtp>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

export const Otp = model<IOtp>("otps", otpSchema);
