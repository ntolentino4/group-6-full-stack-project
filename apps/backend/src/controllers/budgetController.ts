import { Request, Response } from "express";
import {
  getUserBudgetSummary,
  createNewBudgetGoal,
} from "../services/budgetService";

export const getBudgets = async (req: Request, res: Response) => {
  // Extract the ID attached by the global clerkMiddleware()
  const clerkUserId = (req as Request & { auth?: { userId: string } }).auth
    ?.userId;

  // Security Check: If there is no token, block the request
  if (!clerkUserId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const summary = await getUserBudgetSummary(clerkUserId);
    res.status(200).json(summary);
  } catch (error) {
    console.error("Error generating budget summary:", error);
    res.status(500).json({ error: "Failed to load budget summary." });
  }
};

export const createBudget = async (req: Request, res: Response) => {
  // Extract the ID attached by the global clerkMiddleware()
  const clerkUserId = (req as Request & { auth?: { userId: string } }).auth
    ?.userId;

  // Security Check: If there is no token, block the request
  if (!clerkUserId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Extract the body parameters sent from your React front-end
    const { amount, categoryId } = req.body;

    // Call the service to save the new budget to Postgres
    const newBudget = await createNewBudgetGoal(
      clerkUserId,
      amount,
      categoryId,
    );

    res.status(201).json({
      message: "Budget created successfully",
      budget: newBudget,
    });
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ error: "Failed to create budget." });
  }
};
