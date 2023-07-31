import { ObjectId, Types } from "mongoose";

export interface IQuestion {
  _id?: string;
  questionText: string;
  options: string[];
  correctOption: string;
  category: Types.ObjectId;
}
