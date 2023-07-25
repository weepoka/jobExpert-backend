"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtp = void 0;
const express_validation_1 = require("express-validation");
const otpValidation = {
    body: express_validation_1.Joi.object({
        userId: express_validation_1.Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required(),
        otp: express_validation_1.Joi.string().required(),
    }),
};
exports.validateOtp = (0, express_validation_1.validate)(otpValidation, {}, {});
