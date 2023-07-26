"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_controller_1 = require("./otp.controller");
const verifyJwt_1 = require("../../middlewares/verifyJwt");
const router = (0, express_1.Router)();
router.post("/verify-otp", verifyJwt_1.verifyJwt, otp_controller_1.verifyOtp);
// router.get("/send-otp", verifyJwt, sendOpt);
exports.default = router;
