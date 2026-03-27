import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { expenseSchema } from "../validations/schemas";
import * as expenseController from "../controllers/expenseController";

const router: Router = Router();

router.get("/", expenseController.getAllExpenses);

router.post("/", validateRequest(expenseSchema), expenseController.createExpense);

router.delete("/:id", expenseController.deleteExpense);

export default router;