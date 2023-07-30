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
exports.getUserById = exports.deleteUser = exports.resetPassword = exports.changePassWord = exports.logout = exports.login = exports.register = void 0;
const model_1 = require("./model");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_utils_1 = require("../../utils/token-utils");
const uid_generate_1 = require("../../utils/uid-generate");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
//login user
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield model_1.User.findOne({ email });
    if (!user) {
        return next(http_errors_1.default.NotFound("Email not found"));
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(http_errors_1.default.Unauthorized("Password is incorrect"));
    }
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
    const accessToken = (0, token_utils_1.createToken)(userInformation, "ACCESS");
    const refreshToken = (0, token_utils_1.createToken)(userInformation, "REFRESH");
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
    });
    return res.status(201).json({
        message: "Login success",
        data: {
            user: userInformation,
            accessToken,
            refreshToken,
        },
    });
});
exports.login = login;
//logout
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check is there any cookie
    if (!req.cookies.accessToken || req.cookies.refreshToken) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
    }
    return res.status(200).json({
        message: "Logout success",
    });
});
exports.logout = logout;
const changePassWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, user } = req.body;
    const currentUser = yield model_1.User.findById(user._id);
    if (!currentUser) {
        return next(http_errors_1.default.NotFound("User not found"));
    }
    else {
        const isPasswordCorrect = yield bcrypt_1.default.compare(oldPassword, currentUser.password);
        if (!isPasswordCorrect) {
            return next(http_errors_1.default.Unauthorized("Password is incorrect"));
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            // update password
            currentUser.password = hashedPassword;
            yield currentUser.save();
            return res.status(200).json({
                message: "Password changed",
            });
        }
    }
});
exports.changePassWord = changePassWord;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otpToken, password } = req.body;
    // check if user exists
    const currentUser = yield model_1.User.findOne({ email });
    if (!currentUser) {
        return next(http_errors_1.default.NotFound("User not found"));
    }
    else {
        // check if otp token is valid
        const verified = jsonwebtoken_1.default.verify(otpToken, process.env.OTP_TOKEN);
        if (!verified) {
            return next(http_errors_1.default.Unauthorized("OTP token is invalid"));
        }
        else {
            // update password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            currentUser.password = hashedPassword;
            yield currentUser.save();
            return res.status(200).json({
                message: "Password reset success",
            });
        }
    }
});
exports.resetPassword = resetPassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedUser = yield model_1.User.findByIdAndDelete(id);
        res
            .status(200)
            .json({ status: true, message: "user deleted", data: deletedUser });
    }
    catch (error) {
        res.status(500).json({ status: false, message: "internal server error" });
    }
});
exports.deleteUser = deleteUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield model_1.User.findById(id);
    if (user) {
        res.status(200).send({ status: true, data: user });
    }
    else {
        res.status(404).send({ status: false, message: "User Not Found" });
    }
});
exports.getUserById = getUserById;
