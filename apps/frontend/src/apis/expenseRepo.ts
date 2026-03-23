import { mockExpenses } from "../data/mockExpenses";
import type { Expense } from "../../../../shared/types";

let expenses = [...mockExpenses]; 


export async function getAllExpenses(): Promise<Expense[]> {
  return expenses;
}

export async function addExpense(expense: Expense): Promise<Expense> {
  expenses = [expense, ...expenses];
  return expense;
}

export async function deleteExpense(id: number): Promise<void> {
  expenses = expenses.filter((e) => e.id !== id);
}