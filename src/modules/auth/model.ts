import { Schema, model } from "mongoose";
import { IUser } from "./interface";

const userSchema = new Schema<IUser>(
  {
    uid: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Student", "Teacher"],
      default: "Student",
    },
    hasEmailVerified: {
      type: Boolean,
      default: false,
    },
    hasPhoneVerified: { type: Boolean, default: false },
    avatar: {
      type: String,
      default:
        "https://wop-files.s3.us-west-2.amazonaws.com/no-user-image-icon-0-1685274609551.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
