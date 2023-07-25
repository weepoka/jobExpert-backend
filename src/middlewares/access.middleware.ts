import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(process.env.AUTH_TOKEN);
  if (!token) return next(createHttpError.Unauthorized("Access denied"));
  try {
    const verified = jwt.verify(token, process.env.AUTH_TOKEN || "");
    req.body.user = verified;
    next();
  } catch (error) {
    console.log(error);
    next(
      createHttpError.Unauthorized("Your session has expired, please login")
    );
  }
};
