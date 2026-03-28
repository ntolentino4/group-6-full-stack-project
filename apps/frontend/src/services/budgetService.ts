import budgetRepository from "../apis/budgetRepo";
import type { BudgetGoal, ExpenseCategory } from "../../../../shared/types";

const budgetService = {
  getBudgets: async () => {
    return await budgetRepository.getAll();
  },

  addBudget: async (
    category: string,
    limit: number,
    existingBudgets: BudgetGoal[],
  ) => {
    if (existingBudgets.some((b) => b.category === category)) {
      throw new Error(`A budget for ${category} already exists.`);
    }

    if (limit <= 0) {
      throw new Error("Budget limit must be greater than 0.");
    }

    const newBudget: BudgetGoal = {
      id: Date.now(),
      category: category as ExpenseCategory,
      limit: limit,
    };

    return await budgetRepository.add(newBudget);
  },

  deleteBudget: async (id: number) => {
    return await budgetRepository.delete(id);
  },
};

export default budgetService;
