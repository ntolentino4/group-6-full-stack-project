import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { validateRequest } from "../middleware/validateRequest";
import { expenseSchema } from "../validations/schemas";
import * as expenseController from "../controllers/expenseController";

const router = Router();

// Protect all expense operations
router.get("/", requireAuth(), expenseController.getAllExpenses);

router.post(
  "/",
  requireAuth(),
  validateRequest(expenseSchema),
  expenseController.createExpense
);

router.delete("/:id", requireAuth(), expenseController.deleteExpense);

export default router;