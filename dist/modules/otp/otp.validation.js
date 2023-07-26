"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtp = void 0;
const express_validation_1 = require("express-validation");
const otpValidation = {
    body: express_validation_1.Joi.object({
        otp: express_validation_1.Joi.string().required(),
        otpType: express_validation_1.Joi.string().valid("REGISTER", "RESET_PASSWORD").required(),
        otpToken: express_validation_1.Joi.string().required(),
    }),
};
exports.validateOtp = (0, express_validation_1.validate)(otpValidation, {}, {});
