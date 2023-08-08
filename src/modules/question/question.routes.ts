import { Router } from "express";
import { createQuestion, getQuestionByCategory } from "./question.controller";
import { validateQuestion } from "./question.validation";

const router = Router();

router.post(
  "/add-question",
  //  validateQuestion,
  createQuestion
);
router.get("/by-category/:category", getQuestionByCategory);

export default router;
