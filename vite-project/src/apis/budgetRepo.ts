import type { BudgetGoal } from "../types";
import { mockBudgets } from "../data/mockBudgets";

let currentBudgets = [...mockBudgets];

const budgetRepository = {
  getAll: async (): Promise<BudgetGoal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...currentBudgets]), 100);
    });
  },
  add: async (budget: BudgetGoal): Promise<BudgetGoal> => {
    return new Promise((resolve) => {
      currentBudgets = [...currentBudgets, budget];
      resolve(budget);
    });
  },

  delete: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const initialLength = currentBudgets.length;
      currentBudgets = currentBudgets.filter((b) => b.id !== id);
      resolve(currentBudgets.length !== initialLength);
    });
  },
};

export default budgetRepository;
