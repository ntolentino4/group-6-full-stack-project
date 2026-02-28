import type { Expense } from "../types";
import { mockExpenses } from "../data/mockExpenses";

let expenses: Expense[] = [...mockExpenses];

export const expenseRepository = {
  getAll(): Expense[] {
    return expenses;
  },

  add(expense: Omit<Expense, "id">): Expense {
    const newExpense: Expense = { ...expense, id: Date.now() };
    expenses = [newExpense, ...expenses];
    return newExpense;
  },

  update(id: number, data: Partial<Omit<Expense, "id">>): void {
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) return;
    expenses[index] = { ...expenses[index], ...data };
  },

  remove(id: number): void {
    expenses = expenses.filter((e) => e.id !== id);
  },
};
