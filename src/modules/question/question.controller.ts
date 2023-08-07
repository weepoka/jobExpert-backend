import { NextFunction, Request, Response } from "express";
import { IQuestion } from "./question.interface";
import { QuestionModel } from "./question.model";
import { CategoryModel } from "modules/category/category.model";
import { createOptionsForQuestion } from "modules/option/option.controller";
import { OptionModel } from "modules/option/option.model";
import { IOption } from "modules/option/option.interface";

export const name = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teacherId, title, categoryName, questions } = req.body;

    const createdQuestions: IQuestion[] = [];

    for (const q of questions) {
      const { question, options, multipleCorrectAnswers } = q;

      if (options.length < 5 || options.length > 200) {
        return res
          .status(400)
          .json({ error: "Number of options should be between 5 and 200" });
      }

      const optionPromises = options.map((option: IOption) => {
        return OptionModel.create({
          optionText: option.optionText,
          isCorrect: option.isCorrect,
          question: newQuestion,
        });
      });

      const createdOptions = await Promise.all(optionPromises);
      const optionIds = createdOptions.map((option) => option._id);

      // Check if the category already exists or create a new one
      const category = await CategoryModel.findOne({ name: categoryName });
      if (!category) {
        const newCategory = await CategoryModel.create({
          name: categoryName,
        });
      }
      const newQuestion = new QuestionModel({
        teacherId,
        title,
        category: category?._id,
        question,
        options: optionIds,
        multipleCorrectAnswers,
      });

      await newQuestion.save();
      createdQuestions.push(newQuestion);
    }

    res.status(201).json({ status: true, data: createdQuestions });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "failed to create question", error });
  }
};
