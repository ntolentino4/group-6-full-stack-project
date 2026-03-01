import * as ExpenseRepo from "../apis/expenseRepo";
import type { Expense } from "../types";

// Business Logic
export async function addExpense(newExpense: Expense): Promise<Expense> {

  if (!newExpense.description || newExpense.description.trim() === "") {
    throw new Error("Description is required.");
  }

  if (newExpense.amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  return await ExpenseRepo.addExpense(newExpense);
}

export async function getAllExpenses(): Promise<Expense[]> {
  return await ExpenseRepo.getAllExpenses();
}

export async function deleteExpense(id: number): Promise<void> {
  await ExpenseRepo.deleteExpense(id);
}