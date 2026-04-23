import { Request, Response } from "express";
import * as expenseService from "../services/expenseService";

// Use 'any' for req to allow access to req.auth from Clerk
export const getAllExpenses = async (req: any, res: Response) => {
  try {
    // Extract the Clerk User ID from the session token 
    const clerkId = req.auth.userId; 
    const expenses = await expenseService.getAllExpenses(clerkId);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export const createExpense = async (req: any, res: Response) => {
  try {
    const clerkId = req.auth.userId;
    // Pass both the body and the clerkId to create the association
    const newExpense = await expenseService.createExpense(req.body, clerkId);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

export const deleteExpense = async (req: any, res: Response) => {
  try {
    const clerkId = req.auth.userId;
    const id = parseInt(req.params.id as string);
    // Ensure the user can only delete their own data
    await expenseService.deleteExpense(id, clerkId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};