import { Joi, validate } from "express-validation";

const optionValidator = {
  body: Joi.object({
    optionText: Joi.string().required(),
  }),
};

export const validateOption = validate(optionValidator, {}, {});
