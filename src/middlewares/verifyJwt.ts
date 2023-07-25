import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) return next(createHttpError.Unauthorized("Access denied"));
  try {
    const verified = jwt.verify(token, process.env.);
    req.user = verified;
    next();
  } catch (error) {
    next(
      createHttpError.Unauthorized("Your session has expired, please login")
    );
  }
};
