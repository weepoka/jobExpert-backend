import { Joi, validate } from "express-validation";

const registerValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(6)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  }),
};

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const changePasswordValidation = {
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      .required()
      .min(6)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
    confirmNewPassword: Joi.any()
      .equal(Joi.ref("newPassword"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  }),
};

const resetPasswordValidation = {
  body: Joi.object({
    password: Joi.string()
      .required()
      .min(6)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
    otpToken: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

export const validateRegistration = validate(
  registerValidation,
  {
    keyByField: true,
  },
  {}
);

export const validateLogin = validate(
  loginValidation,
  {
    keyByField: true,
  },
  {}
);

export const validateChangePassword = validate(
  changePasswordValidation,
  {
    keyByField: true,
  },
  {}
);

export const validateResetPassword = validate(
  resetPasswordValidation,
  {
    keyByField: true,
  },

  {}
);
