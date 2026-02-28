import type { Expense } from "../types";
import { expenseRepository } from "../repositories/expenseRepository";

export const expenseService = {
  getAll(): Expense[] {
    return expenseRepository.getAll();
  },

  add(expense: Omit<Expense, "id">): Expense {
    return expenseRepository.add(expense);
  },

  update(id: number, data: Partial<Omit<Expense, "id">>): void {
    expenseRepository.update(id, data);
  },

  remove(id: number): void {
    expenseRepository.remove(id);
  },
};
