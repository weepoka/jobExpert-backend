import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Otp } from "./otp.model";
import jwt from "jsonwebtoken";
import { createToken } from "utils/token-utils";
import { generateOtp } from "utils/otp-generate";

//
export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, otpToken } = req.body;
    const { _id } = req.user;
    const user = await Otp.findOne({ userId: _id });
    const validOtp = await Otp.findOne({ userId: _id, otp });
    if (!user) {
      res.status(404).json({ status: false, message: "User not found" });
    }
    if (!validOtp) {
      res.status(404).json({ status: false, message: "Otp not found" });
    }
    const verifyToken = jwt.verify(otpToken, process.env.)
  } catch (error) {
    console.log(error);
    return next(createHttpError.InternalServerError());
  }
};

//send Otp

export const sendOpt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const otpToken = createToken(user, "OTP");
    const otp = generateOtp();
    res
      .status(200)
      .json({ status: true, message: "Otp generated", otp, otpToken });
  } catch (error) {
    console.log(error);
    return next(createHttpError.InternalServerError());
  }
};
