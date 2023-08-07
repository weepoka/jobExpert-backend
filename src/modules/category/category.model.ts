import { Document, Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export interface ICategoryModel extends ICategory, Document {}

export const CategoryModel = model<ICategory>("Category", categorySchema);
