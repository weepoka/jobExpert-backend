import { Router } from "express";
import authRoutes from "modules/auth";
import otpRoutes from "modules/otp/otp.index";

const router = Router();

router.use("/auth", authRoutes);
router.use("/otp", otpRoutes);

export default router;
