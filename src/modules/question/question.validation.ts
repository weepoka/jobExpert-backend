import { Joi, validate } from "express-validation";

const questionValidator = {
  body: Joi.object({
    questionText: Joi.string().required(),
    options: Joi.array().items(Joi.string().required()).min(2).required(),
    correctOption: Joi.string().required(),
  }),
};

export const validateQuestion = validate(questionValidator, {}, {});
