"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
});
exports.Otp = (0, mongoose_1.model)("otps", otpSchema);
