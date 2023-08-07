import { NextFunction, Request, Response } from "express";
import { IOption } from "./option.interface";
import { OptionModel } from "./option.model";

export const createOptionsForQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const optionsData: {
      text: string;
      isCorrect: boolean;
      question: string;
    }[] = req.body.optionsData;

    const optionIds: IOption["_id"][] = [];

    for (const optionData of optionsData) {
      const newOption = new OptionModel({
        text: optionData.text,
        isCorrect: optionData.isCorrect,
        question: optionData.question,
      });
      await newOption.save();
      optionIds.push(newOption._id);
    }
    res.status(201).json(optionIds);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "option creating failed", error });
  }
};
