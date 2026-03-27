import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { budgetGoalSchema } from "../validations/schemas";
import * as budgetController from "../controllers/budgetController";

const router = Router();

router.get("/", budgetController.getBudgets);

router.post(
  "/",
  validateRequest(budgetGoalSchema),
  budgetController.createBudget,
);

router.delete("/:id", budgetController.deleteBudget);

export default router;
