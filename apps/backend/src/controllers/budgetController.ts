import { Request, Response } from "express";
import * as budgetService from "../services/budgetService";
import prisma from "../../prisma/client";

// 1. Extend the Request type so TypeScript knows about Clerk's auth object
interface AuthRequest extends Request {
  auth?: { userId: string };
}

export const getBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: req.auth?.userId },
    });
    if (!user) return res.status(404).json({ error: "User not synced" });

    const budgets = await budgetService.getBudgets(user.id);
    res.json(
      budgets.map((b: any) => ({
        id: b.id,
        limit: b.limit,
        category: b.category.name,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

export const createBudget = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: req.auth?.userId },
    });
    if (!user) return res.status(404).json({ error: "User not synced" });

    const b = await budgetService.createBudget({
      ...req.body,
      userId: user.id,
    });
    res
      .status(201)
      .json({ id: b.id, limit: b.limit, category: b.category.name });
  } catch (error) {
    res.status(500).json({ error: "Failed to create" });
  }
};

export const deleteBudget = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: req.auth?.userId },
    });
    if (!user) return res.status(404).json({ error: "User not synced" });

    // 2. Cast req.params.id to a string before parsing
    await budgetService.deleteBudget(
      parseInt(req.params.id as string),
      user.id,
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
};
