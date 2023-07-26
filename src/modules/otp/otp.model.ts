import { Schema, model } from "mongoose";
import { IOtp } from "./otp.interface";

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpToken: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "2m",
    },
    otpType: {
      type: String,
      enum: ["REGISTER", "RESET_PASSWORD"],
      default: "REGISTER",
    },
  },
  {
    timestamps: true,
  }
);

export const Otp = model<IOtp>("otps", otpSchema);
