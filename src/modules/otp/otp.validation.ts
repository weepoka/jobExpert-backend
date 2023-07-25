import { Joi, validate } from "express-validation";

const otpValidation = {
  body: Joi.object({
    userId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    otp: Joi.string().required(),
  }),
};

export const validateOtp = validate(otpValidation, {}, {});
