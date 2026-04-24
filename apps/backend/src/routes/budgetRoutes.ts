import { Router } from "express";
import * as budgetController from "../controllers/budgetController";

const router = Router();

// Route traffic directly to the controller.
// No deprecated middleware or messy TypeScript casting required!
router.get("/", budgetController.getBudgets);
router.post("/", budgetController.createBudget);

export default router;
