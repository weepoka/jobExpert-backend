"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const validator_1 = require("./validator");
const router = (0, express_1.Router)();
router.post("/register", validator_1.validateRegistration, controller_1.register);
exports.default = router;
