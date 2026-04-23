import { Request, Response } from "express";
import * as expenseService from "../services/expenseService";
import prisma from "../../prisma/client";

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { clerkUserId: req.auth?.userId } });
    if (!user) return res.status(404).json({ error: "User not synced" });
    res.status(200).json(await expenseService.getAllExpenses(user.id));
  } catch (error) { res.status(500).json({ error: "Failed to fetch" }); }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { clerkUserId: req.auth?.userId } });
    if (!user) return res.status(404).json({ error: "User not synced" });
    res.status(201).json(await expenseService.createExpense({ ...req.body, userId: user.id }));
  } catch (error) { res.status(500).json({ error: "Failed to create" }); }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { clerkUserId: req.auth?.userId } });
    if (!user) return res.status(404).json({ error: "User not synced" });
    await expenseService.deleteExpense(parseInt(req.params.id), user.id);
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: "Failed to delete" }); }
};