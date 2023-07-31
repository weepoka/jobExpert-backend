import { NextFunction, Request, Response } from "express";
import { IOption } from "./option.interface";
import { OptionModel } from "./option.model";

export const createOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const optionData: IOption = req.body;
    const option = new OptionModel(optionData);
    await option.save();
    res.status(201).json(option);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "option creating failed", error });
  }
};

//get selected option
export const getOptionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const optionId = req.params.id;
    const option = await OptionModel.findById(optionId);
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }
    res.json(option);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "failed to fetch by id", error });
  }
};
//get all options

export const getAllOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options = await OptionModel.find();
    res.json(options);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "failed to get all options", error });
  }
};
