import * as expenseRepo from "../apis/expenseRepo";
import type { Expense } from "../../../../shared/types";

export const getAllExpenses = async (token: string) => expenseRepo.getAll(token);
export const deleteExpense = async (id: number, token: string) => expenseRepo.remove(id, token);
export const createExpense = async (data: Omit<Expense, 'id'>, token: string) => {
  if (!data.description || data.description.trim() === "") throw new Error("Description required.");
  if (data.amount <= 0) throw new Error("Amount must be positive.");
  return await expenseRepo.create(data, token);
};