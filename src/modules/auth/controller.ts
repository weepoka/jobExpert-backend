import { NextFunction, Request, Response } from "express";
import { User } from "./model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { createToken } from "utils/token-utils";
import { generateRandomUID } from "utils/uid-generate";
import sendMail from "utils/send-email";
import { generateOtp } from "utils/otp-generate";
import { Otp } from "modules/otp/otp.model";
import jwt from "jsonwebtoken";

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
      res.status(201).json({
        status: true,
        message: "Success",
        data: {
          user: userInformation,
          accessToken,
          refreshToken,
        },
      });
      next();
    } catch (error) {
      console.log(error);
      return next(createHttpError.InternalServerError());
    }
  }
};

//login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(createHttpError.NotFound("Email not found"));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return next(createHttpError.Unauthorized("Password is incorrect"));
  }

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

  const accessToken = createToken(userInformation, "ACCESS");

  const refreshToken = createToken(userInformation, "REFRESH");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
  });

  return res.status(201).json({
    message: "Login success",
    data: {
      user: userInformation,
      accessToken,
      refreshToken,
    },
  });
};

//logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check is there any cookie
  if (!req.cookies.accessToken || req.cookies.refreshToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }

  return res.status(200).json({
    message: "Logout success",
  });
};

export const changePassWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword, user } = req.body;

  const currentUser = await User.findById(user._id);

  if (!currentUser) {
    return next(createHttpError.NotFound("User not found"));
  } else {
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      currentUser.password
    );

    if (!isPasswordCorrect) {
      return next(createHttpError.Unauthorized("Password is incorrect"));
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // update password
      currentUser.password = hashedPassword;

      await currentUser.save();

      return res.status(200).json({
        message: "Password changed",
      });
    }
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, otpToken, password } = req.body;

  // check if user exists

  const currentUser = await User.findOne({ email });

  if (!currentUser) {
    return next(createHttpError.NotFound("User not found"));
  } else {
    // check if otp token is valid
    const verified = jwt.verify(otpToken, process.env.OTP_TOKEN!);

    if (!verified) {
      return next(createHttpError.Unauthorized("OTP token is invalid"));
    } else {
      // update password
      const hashedPassword = await bcrypt.hash(password, 10);

      currentUser.password = hashedPassword;

      await currentUser.save();

      return res.status(200).json({
        message: "Password reset success",
      });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "user deleted", data: deletedUser });
  } catch (error) {
    res.status(500).json({ status: false, message: "internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    res.status(200).send({ status: true, data: user });
  } else {
    res.status(404).send({ status: false, message: "User Not Found" });
  }
};
