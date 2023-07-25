import { NextFunction, Request, Response } from "express";
import { User } from "./model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { createToken } from "utils/token-utils";
import { generateRandomUID } from "utils/uid-generate";
import sendMail from "utils/send-email";
import { generateOtp } from "utils/otp-generate";

//register an user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone, password } = req.body;
  const uid = await generateRandomUID();
  const isAlreadyExists = await User.findOne({ email });

  if (isAlreadyExists) {
    return next(
      createHttpError.Conflict(`${email} is already been registered`)
    );
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        uid,
        name,
        email,
        password: hashedPassword,
        phone,
      });

      const userInformation = {
        _id: user._id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        hasEmailVerified: user.hasEmailVerified,
        hasPhoneVerified: user.hasPhoneVerified,
        role: user.role,
      };

      //here is the email verification function

      //   await sendMail({
      //     email: user.email,
      //     subject: "Confirm for email Verification",
      //     message: `you verification code is ${otp}`,
      //   });

      const accessToken = createToken(userInformation, "ACCESS");

      const refreshToken = createToken(userInformation, "REFRESH");

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
      });

      return res.status(201).json({
        status: true,
        message: "Success",
        data: {
          user: userInformation,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.log(error);
      return next(createHttpError.InternalServerError());
    }
  }
};
