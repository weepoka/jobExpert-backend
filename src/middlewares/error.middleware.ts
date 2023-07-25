import { ErrorRequestHandler, RequestHandler } from "express";
import { ValidationError } from "express-validation";
import createHttpError from "http-errors";

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(createHttpError.NotFound());
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next("Something went wrong");
  } else {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
    const status = err.status || 501;
    return res.status(status).json({
      message: err?.message || "There was an error",
    });
  }
};
