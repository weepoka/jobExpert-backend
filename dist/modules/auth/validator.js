"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPassword = exports.validateChangePassword = exports.validateLogin = exports.validateRegistration = void 0;
const express_validation_1 = require("express-validation");
const registerValidation = {
    body: express_validation_1.Joi.object({
        name: express_validation_1.Joi.string().required(),
        email: express_validation_1.Joi.string().email().required(),
        phone: express_validation_1.Joi.string().required(),
        password: express_validation_1.Joi.string()
            .required()
            .min(6)
            .regex(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
        confirmPassword: express_validation_1.Joi.any()
            .equal(express_validation_1.Joi.ref("password"))
            .required()
            .label("Confirm password")
            .options({ messages: { "any.only": "{{#label}} does not match" } }),
    }),
};
const loginValidation = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string().email().required(),
        password: express_validation_1.Joi.string().required(),
    }),
};
const changePasswordValidation = {
    body: express_validation_1.Joi.object({
        oldPassword: express_validation_1.Joi.string().required(),
        newPassword: express_validation_1.Joi.string()
            .required()
            .min(6)
            .regex(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
        confirmNewPassword: express_validation_1.Joi.any()
            .equal(express_validation_1.Joi.ref("newPassword"))
            .required()
            .label("Confirm password")
            .options({ messages: { "any.only": "{{#label}} does not match" } }),
    }),
};
const resetPasswordValidation = {
    body: express_validation_1.Joi.object({
        password: express_validation_1.Joi.string()
            .required()
            .min(6)
            .regex(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
        confirmPassword: express_validation_1.Joi.any()
            .equal(express_validation_1.Joi.ref("password"))
            .required()
            .label("Confirm password")
            .options({ messages: { "any.only": "{{#label}} does not match" } }),
        otpToken: express_validation_1.Joi.string().required(),
        email: express_validation_1.Joi.string().email().required(),
    }),
};
exports.validateRegistration = (0, express_validation_1.validate)(registerValidation, {
    keyByField: true,
}, {});
exports.validateLogin = (0, express_validation_1.validate)(loginValidation, {
    keyByField: true,
}, {});
exports.validateChangePassword = (0, express_validation_1.validate)(changePasswordValidation, {
    keyByField: true,
}, {});
exports.validateResetPassword = (0, express_validation_1.validate)(resetPasswordValidation, {
    keyByField: true,
}, {});
