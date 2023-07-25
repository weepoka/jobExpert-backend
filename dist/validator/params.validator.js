"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyParams = void 0;
const express_validation_1 = require("express-validation");
const paramsIdValidator = {
    params: express_validation_1.Joi.object({
        id: express_validation_1.Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
};
exports.verifyParams = (0, express_validation_1.validate)(paramsIdValidator, {}, {});
