"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../modules/auth"));
const otp_index_1 = __importDefault(require("../modules/otp/otp.index"));
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/otp", otp_index_1.default);
exports.default = router;
