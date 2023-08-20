import { Router } from "express";
import { createQuestion, getQuestionByCategory } from "./question.controller";
import { validateQuestion } from "./question.validation";
import { verifyJwt } from "middlewares/verifyJwt";

const router = Router();

router.post("/add-question", verifyJwt, validateQuestion, createQuestion);
router.get("/by-category/:category", getQuestionByCategory);

export default router;
