import { Joi, validate } from "express-validation";

const otpValidation = {
  body: Joi.object({
    otp: Joi.string().required(),
    otpType: Joi.string().valid("REGISTER", "RESET_PASSWORD").required(),
    otpToken: Joi.string().required(),
  }),
};

export const validateOtp = validate(otpValidation, {}, {});
