import { IOption } from "modules/option/option.interface";
import { ObjectId, Types } from "mongoose";

export interface IQuestion {
  _id?: string;
  teacherId: string;
  title: string;
  category: Types.ObjectId; // Refers to the Category's _id
  question: string;
  options: Types.ObjectId[];
  multipleCorrectAnswers: boolean;
}
