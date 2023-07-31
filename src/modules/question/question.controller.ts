import { NextFunction, Request, Response } from "express";
import { IQuestion } from "./question.interface";
import { QuestionModel } from "./question.model";
import { OptionModel } from "modules/option/option.model";
import { IOption } from "modules/option/option.interface";

//create a new question
export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionData: IQuestion = req.body;

    const savedOptions = await Promise.all(
      questionData.options.map(async (optionText) => {
        // Change 'optionData' to 'optionText'
        const option = new OptionModel({ optionText }); // Create an object with 'optionText' property
        return await option.save();
      })
    );
    const optionIds: string[] = savedOptions.map((option) => option._id);
    questionData.options = optionIds;
    questionData.correctOption =
      optionIds[parseInt(questionData.correctOption) - 1];

    const question = new QuestionModel(questionData);
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    console.error("Question create error:", error);
    res
      .status(500)
      .json({ status: false, message: "Question create failed", error });
  }
};

// get all questions
export const getAllQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await QuestionModel.find()
      .populate("options")
      .populate("correctOption");
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Failed to fetch questions", error });
  }
};

//get specific questions

export const getQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to get the specific question",
      error,
    });
  }
};

//update a question
export const updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.params.id;
    const updatedQuestionData: IQuestion = req.body;
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      updatedQuestionData,
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to update", error });
  }
};

//delete an existing question

export const name = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(deletedQuestion);
  } catch (error) {
    res.status(500).json({ status: false, message: "", error });
  }
};
