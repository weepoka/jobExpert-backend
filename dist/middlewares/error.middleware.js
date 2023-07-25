"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const express_validation_1 = require("express-validation");
const http_errors_1 = __importDefault(require("http-errors"));
const notFoundHandler = (req, res, next) => {
    next(http_errors_1.default.NotFound());
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next("Something went wrong");
    }
    else {
        if (err instanceof express_validation_1.ValidationError) {
            return res.status(err.statusCode).json(err);
        }
        const status = err.status || 501;
        return res.status(status).json({
            message: (err === null || err === void 0 ? void 0 : err.message) || "There was an error",
        });
    }
};
exports.errorHandler = errorHandler;
