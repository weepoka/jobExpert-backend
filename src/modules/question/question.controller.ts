import { NextFunction, Request, Response } from "express";
import { IQuestion } from "./question.interface";
import { QuestionModel } from "./question.model";
import { CategoryModel } from "modules/category/category.model";
import { createOptionsForQuestion } from "modules/option/option.controller";
import { OptionModel } from "modules/option/option.model";
import { IOption } from "modules/option/option.interface";

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teacherId, title, categoryName, questions } = req.body;

    const createdQuestions: IQuestion[] = [];

    // console.log(req.body);
    for (const q of questions) {
      const { question, options, multipleCorrectAnswers } = q;
      // console.log(options);
      if (question.length < 5 || question.length > 200) {
        return res
          .status(400)
          .json({ error: "Number of question should be between 5 and 200" });
      }

      const optionPromises = options.map((option: IOption) => {
        // console.log(option);
        return OptionModel.create({
          optionText: option.optionText,
          isCorrect: option.isCorrect,
          question: option.question,
        });
      });

      const createdOptions = await Promise.all(optionPromises);
      const optionIds = createdOptions.map((option) => option._id);

      let category = await CategoryModel.findOne({
        categoryName: categoryName,
      });
      if (!category) {
        category = await CategoryModel.create({
          categoryName: categoryName,
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
      // console.log(newQuestion);

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

//get all questions by category

export const getQuestionByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;

    const findCategory = await CategoryModel.findOne({
      categoryName: { $regex: new RegExp(`^${category}$`, "i") },
    });
    if (!findCategory) {
      return res
        .status(404)
        .json({ status: false, message: "No such category found" });
    }
    const questions = await QuestionModel.find({
      category: findCategory._id,
    })
      .populate("options")
      .populate("category");

    res.status(201).json({ status: true, data: questions });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to fetch", error });
  }
};
