import { Schema, model } from "mongoose";
import { IOption } from "./option.interface";

const optionSchema = new Schema<IOption>({
  optionText: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  question: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
});

export const OptionModel = model<IOption>("Option", optionSchema);
