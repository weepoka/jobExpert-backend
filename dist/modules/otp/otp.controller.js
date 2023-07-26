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
exports.verifyOtp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const otp_model_1 = require("./otp.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../../modules/auth/model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, otpToken } = req.body;
        const { _id } = req.user;
        const user = yield model_1.User.findOne({ _id });
        // const user = await Otp.findOne({userId: _id});
        const validOtp = yield otp_model_1.Otp.findOne({ userId: _id, otp });
        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
        }
        if (!validOtp) {
            res.status(404).json({ status: false, message: "Otp not found" });
        }
        const verifyToken = jsonwebtoken_1.default.verify(otpToken, process.env.OTP_TOKEN);
        // console.log(process.env.OTP_TOKEN);
        if (typeof verifyToken === "string") {
            return next(http_errors_1.default.Unauthorized("Invalid OTP token"));
        }
        if (user && !user.hasEmailVerified) {
            user.hasEmailVerified = true;
            yield user.save();
        }
        return res.status(200).json({ message: "Otp validation successful" });
    }
    catch (error) {
        console.log(error);
        return next(http_errors_1.default.InternalServerError());
    }
});
exports.verifyOtp = verifyOtp;
//send Otp
// export const sendOpt = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = req.user;
//     const otpToken = createToken(user, "OTP");
//     const otp = generateOtp();
//     res
//       .status(200)
//       .json({ status: true, message: "Otp generated", otp, otpToken });
//   } catch (error) {
//     console.log(error);
//     return next(createHttpError.InternalServerError());
//   }
// };
