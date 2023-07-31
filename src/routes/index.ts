import { Router } from "express";
import authRoutes from "modules/auth";
import otpRoutes from "modules/otp/otp.index";
import questionRoutes from "modules/question/question.index";

const router = Router();

router.use("/auth", authRoutes);
router.use("/otp", otpRoutes);
router.use("/question", questionRoutes);

export default router;
