import { ObjectId } from "mongoose";

export interface IOtp {
  userId: ObjectId;
  otp: string;
}
