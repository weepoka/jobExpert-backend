import { Schema, model } from "mongoose";
import { IQuestion } from "./question.interface";

const questionSchema = new Schema<IQuestion>({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: Schema.Types.ObjectId,
      ref: "Option",
      required: true,
    },
  ],
  correctOption: [
    {
      type: Schema.Types.ObjectId,
      ref: "Option",
      required: true,
    },
  ],
});

export const QuestionModel = model<IQuestion>("questions", questionSchema);
