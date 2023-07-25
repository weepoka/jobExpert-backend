import { Router } from "express";
import { register } from "./controller";
import { validateRegistration } from "./validator";

const router = Router();

router.post("/register", validateRegistration, register);

export default router;
