import { Router } from "express";
import { sendOpt, verifyOtp } from "./otp.controller";
import { verifyJwt } from "middlewares/verifyJwt";
import { validateOtp } from "./otp.validation";

const router = Router();

router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOpt);

export default router;
