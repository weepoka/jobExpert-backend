import { Router } from "express";
import { verifyOtp } from "./otp.controller";
import { verifyJwt } from "middlewares/verifyJwt";

const router = Router();

router.post("/verify-otp", verifyJwt, verifyOtp);
// router.get("/send-otp", verifyJwt, sendOpt);

export default router;
