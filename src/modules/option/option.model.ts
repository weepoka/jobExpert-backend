import { Schema, model } from "mongoose";
import { IOption } from "./option.interface";

const optionSchema = new Schema<IOption>({
  optionText: {
    type: String,
    required: true,
  },
});

export const OptionModel = model<IOption>("options", optionSchema);
