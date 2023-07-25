import { Joi, validate } from "express-validation";

const paramsIdValidator = {
  params: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
};
export const verifyParams = validate(paramsIdValidator, {}, {});
