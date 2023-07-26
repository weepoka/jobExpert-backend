"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, keyType) => {
    if (keyType === "ACCESS") {
        return jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN, {
            expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN || "15m",
        });
    }
    else if (keyType === "REFRESH") {
        return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
        });
    }
    return jsonwebtoken_1.default.sign(payload, process.env.OTP_TOKEN, {
        expiresIn: process.env.OTP_TOKEN_EXPIRES_IN || "1d",
    });
};
exports.createToken = createToken;
