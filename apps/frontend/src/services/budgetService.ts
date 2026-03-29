import budgetRepository from "../apis/budgetRepo";
import type { BudgetGoal, ExpenseCategory } from "../../../../shared/types";

/**
 * Service layer to handle business logic (like validation) 
 * before calling the data repository.
 */
const budgetService = {
  getBudgets: async () => {
    return await budgetRepository.getAll();
  },

  addBudget: async (
    category: string,
    limit: number,
    existingBudgets: BudgetGoal[],
  ) => {
    // 1. Validation: Prevent duplicate categories
    if (existingBudgets.some((b) => b.category === category)) {
      throw new Error(`A budget for ${category} already exists.`);
    }

    // 2. Validation: Prevent negative limits
    if (limit <= 0) {
      throw new Error("Budget limit must be greater than 0.");
    }

    const newBudget: Omit<BudgetGoal, "id"> = {
      category: category as ExpenseCategory,
      limit: limit,
    };

    // Calls 'add' from budgetRepo
    return await budgetRepository.add(newBudget);
  },

  deleteBudget: async (id: number) => {
    return await budgetRepository.remove(id);
  },
};

export default budgetService;