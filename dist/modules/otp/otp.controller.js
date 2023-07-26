"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOpt = exports.verifyOtp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_utils_1 = require("../../utils/token-utils");
const otp_generate_1 = require("../../utils/otp-generate");
const model_1 = require("../../modules/auth/model");
const dotenv_1 = __importDefault(require("dotenv"));
const send_email_1 = __importDefault(require("../../utils/send-email"));
const email_templates_1 = require("../../utils/email-templates");
dotenv_1.default.config();
//
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, otpToken, otpType } = req.body;
        const user = yield model_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        try {
            const isOtpValid = jsonwebtoken_1.default.verify(otpToken, process.env.OTP_TOKEN);
            if (typeof isOtpValid === "string") {
                return next(http_errors_1.default.Unauthorized("Invalid OTP Token"));
            }
            if (isOtpValid.email === email &&
                isOtpValid.otp === otp &&
                isOtpValid.otpType === otpType) {
                user.hasEmailVerified = true;
                yield user.save();
                return res.status(200).json({ message: "Otp validation successful" });
            }
            else {
                return res.status(401).json({ message: "Invalid OTP" });
            }
        }
        catch (error) {
            return next(http_errors_1.default.Unauthorized("OTP Expired"));
        }
    }
    catch (error) {
        console.log(error);
        return next(http_errors_1.default.InternalServerError());
    }
});
exports.verifyOtp = verifyOtp;
// send Otp
const sendOpt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otpType } = req.body;
        const user = yield model_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        const otp = (0, otp_generate_1.generateOtp)().toString();
        const otpToken = (0, token_utils_1.createToken)({
            email,
            otpType,
            otp,
        }, "OTP");
        const emailBody = (0, email_templates_1.otpTemplate)(otp);
        yield (0, send_email_1.default)({
            email,
            subject: "your verification code",
            message: emailBody,
            otp,
        });
        res.status(200).json({ status: true, message: "Otp generated", otpToken });
    }
    catch (error) {
        console.log(error);
        return next(http_errors_1.default.InternalServerError());
    }
});
exports.sendOpt = sendOpt;
