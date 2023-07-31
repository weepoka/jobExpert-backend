import { Router } from "express";
import {
  createOption,
  getAllOptions,
  getOptionById,
} from "./option.controller";
import { validateOption } from "./option.validation";

const router = Router();

router.post("/create-options", validateOption, createOption);
router.get("/get-options", getAllOptions);
router.get("/get-option/:id", getOptionById);

export default router;
