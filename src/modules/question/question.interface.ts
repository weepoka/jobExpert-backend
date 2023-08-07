import { IOption } from "modules/option/option.interface";
import { ObjectId, Types } from "mongoose";

export interface IQuestion {
  _id?: string;
  teacherId: string;
  title: string;
  category: string; // Refers to the Category's _id
  question: string;
  options: IOption["_id"][];
  multipleCorrectAnswers: boolean;
}
