import { Schema, model } from "mongoose";
import { IQuestion } from "./question.interface";

const questionSchema = new Schema<IQuestion>({
  teacherId: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  question: { type: String, required: true },
  options: [{ type: Schema.Types.ObjectId, ref: "Option", required: true }],
  multipleCorrectAnswers: { type: Boolean, required: true },
});

export const QuestionModel = model<IQuestion>("questions", questionSchema);
