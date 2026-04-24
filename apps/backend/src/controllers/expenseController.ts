import { Request, Response } from "express";
import * as expenseService from "../services/expenseService";
import prisma from "../../prisma/client";

interface AuthRequest extends Request {
  auth?: { userId: string }; // Clerk injects this
}

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    // FIX 1: Cast req to 'any' so TypeScript stops complaining about .auth
    const clerkUserId = (req as any).auth?.userId;
    if (!clerkUserId) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({ where: { clerkUserId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const expenses = await expenseService.getAllExpenses(user.id);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const clerkUserId = (req as any).auth?.userId;
    if (!clerkUserId) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({ where: { clerkUserId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const savedExpense = await expenseService.addExpense(user.id, req.body);
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to save expense" });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    // 1. Authenticate: Who is making this request?
    const user = await prisma.user.findUnique({
      where: { clerkUserId: req.auth?.userId },
    });
    if (!user) return res.status(404).json({ error: "User not synced" });

    // 2. Pass BOTH the target expense ID and the requesting User's ID
    await expenseService.deleteExpense(
      parseInt(req.params.id as string),
      user.id,
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
};
