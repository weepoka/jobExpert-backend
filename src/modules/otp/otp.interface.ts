import { ObjectId } from "mongoose";

export interface IOtp {
  email: string;
  otp: string;
  otpToken: string;
  otpType: "REGISTER" | "RESET_PASSWORD";
  createdAt?: Date;
}
