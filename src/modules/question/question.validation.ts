import { Joi, validate } from "express-validation";

export const questionValidator = {
  body: Joi.object({
    questionText: Joi.string().required(),
    options: Joi.array().items(Joi.string().required()).min(2).required(),
    correctOption: Joi.number().integer().min(0).required(),
  }),
};

export const validateQuestion = validate(questionValidator, {}, {});
