import { Router } from "express";
import { createQuestion, getAllQuestions } from "./question.controller";
import { validateQuestion } from "./question.validation";

const router = Router();

router.post("/create-question", validateQuestion, createQuestion);
router.get("/get-all-questions", getAllQuestions);

export default router;
