"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    otpToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "2m",
    },
    otpType: {
        type: String,
        enum: ["REGISTER", "RESET_PASSWORD"],
        default: "REGISTER",
    },
}, {
    timestamps: true,
});
exports.Otp = (0, mongoose_1.model)("otps", otpSchema);
