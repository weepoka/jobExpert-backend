import { NextFunction, Request, Response } from "express";
import { ICategory } from "./category.interface";
import { CategoryModel, ICategoryModel } from "./category.model";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryName: string = req.body.categoryName;

    let category: ICategory | null = await CategoryModel.findOne({
      name: categoryName,
    });

    if (!category) {
      const newCategory: ICategoryModel = new CategoryModel({
        name: categoryName,
      });
      category = await newCategory.save();
    }
    return res.json({ status: true, category });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to create or find category",
      error,
    });
  }
};
