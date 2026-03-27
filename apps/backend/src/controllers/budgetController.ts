import { Request, Response } from "express";
import * as budgetService from "../services/budgetService";

export const getBudgets = async (req: Request, res: Response) => {
  const budgets = await budgetService.getBudgets();
  res.json(
    budgets.map((b: any) => ({
      id: b.id,
      limit: b.limit,
      category: b.category.name,
    })),
  );
};

export const createBudget = async (req: Request, res: Response) => {
  const b = await budgetService.createBudget(req.body);
  res.status(201).json({ id: b.id, limit: b.limit, category: b.category.name });
};

export const deleteBudget = async (req: Request, res: Response) => {
  try {
    await budgetService.deleteBudget(parseInt(req.params.id as string));
    res.status(204).send(); // 204 means "Success, but no content to return"
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget" });
  }
};
