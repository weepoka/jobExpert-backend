import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Otp } from "./otp.model";
import jwt from "jsonwebtoken";
import { createToken } from "utils/token-utils";
import { generateOtp } from "utils/otp-generate";
import { User } from "modules/auth/model";
import dotenv from "dotenv";
import sendMail from "utils/send-email";
import { otpTemplate } from "utils/email-templates";

dotenv.config();

//
export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, otpToken, otpType } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    try {
      const isOtpValid = jwt.verify(otpToken, process.env.OTP_TOKEN!);

      if (typeof isOtpValid === "string") {
        return next(createHttpError.Unauthorized("Invalid OTP Token"));
      }
      if (
        isOtpValid.email === email &&
        isOtpValid.otp === otp &&
        isOtpValid.otpType === otpType
      ) {
        user.hasEmailVerified = true;
        await user.save();
        return res.status(200).json({ message: "Otp validation successful" });
      } else {
        return res.status(401).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      return next(createHttpError.Unauthorized("OTP Expired"));
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError.InternalServerError());
  }
};

// send Otp

export const sendOpt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otpType } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    const otp = generateOtp().toString();

    const otpToken = createToken(
      {
        email,
        otpType,
        otp,
      },
      "OTP"
    );
    const emailBody = otpTemplate(otp);
    await sendMail({
      email,
      subject: "your verification code",
      message: emailBody,
    });
    res.status(200).json({ status: true, message: "Otp generated", otpToken });
  } catch (error) {
    console.log(error);
    return next(createHttpError.InternalServerError());
  }
};
