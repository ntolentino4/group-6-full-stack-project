import { Router } from "express";
import * as expenseController from "../controllers/expenseController";

const router = Router();

router.get("/", expenseController.getAllExpenses);
router.post("/", expenseController.addExpense); 
router.delete("/:id", expenseController.deleteExpense);

export default router;