import { Joi, validate } from "express-validation";

export const questionValidator = {
  body: Joi.object({
    questionText: Joi.string().min(5).max(200).required(),
    options: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().required(),
          isCorrect: Joi.boolean().required(),
        })
      )
      .min(2)
      .required(),
    multipleCorrectAnswers: Joi.boolean().required(),
  }),
};

export const validateQuestion = validate(questionValidator, {}, {});
