"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_controller_1 = require("./otp.controller");
const router = (0, express_1.Router)();
router.post("/verify-otp", otp_controller_1.verifyOtp);
router.post("/send-otp", otp_controller_1.sendOpt);
exports.default = router;
