import { Router } from "express";
import { createQuestion } from "./question.controller";
import { validateQuestion } from "./question.validation";

const router = Router();

router.post(
  "/add-question",
  //  validateQuestion,
  createQuestion
);

export default router;
