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
exports.register = void 0;
const model_1 = require("./model");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_utils_1 = require("../../utils/token-utils");
const uid_generate_1 = require("../../utils/uid-generate");
const otp_generate_1 = require("../../utils/otp-generate");
//register an user
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password } = req.body;
    const uid = yield (0, uid_generate_1.generateRandomUID)();
    const isAlreadyExists = yield model_1.User.findOne({ email });
    if (isAlreadyExists) {
        return next(http_errors_1.default.Conflict(`${email} is already been registered`));
    }
    else {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const otp = (0, otp_generate_1.generateOtp)();
            const user = yield model_1.User.create({
                uid,
                name,
                email,
                password: hashedPassword,
                phone,
            });
            const userInformation = {
                _id: user._id,
                uid: user.uid,
                name: user.name,
                email: user.email,
                phone: user.phone,
                hasEmailVerified: user.hasEmailVerified,
                hasPhoneVerified: user.hasPhoneVerified,
                role: user.role,
            };
            //here is the email verification function
            //   await sendMail({
            //     email: user.email,
            //     subject: "Confirm for email Verification",
            //     message: `you verification code is ${otp}`,
            //   });
            const accessToken = (0, token_utils_1.createToken)(userInformation, "ACCESS");
            const refreshToken = (0, token_utils_1.createToken)(userInformation, "REFRESH");
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                path: "/",
            });
            return res.status(201).json({
                status: true,
                message: "Success",
                data: {
                    user: userInformation,
                    accessToken,
                    refreshToken,
                },
            });
        }
        catch (error) {
            console.log(error);
            return next(http_errors_1.default.InternalServerError());
        }
    }
});
exports.register = register;
