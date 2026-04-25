import * as budgetRepo from "../apis/budgetRepo";
import type { BudgetGoal } from "../../../../shared/types";

export const getBudgets = async (token: string) => budgetRepo.getAll(token);
export const deleteBudget = async (id: number, token: string) =>
  budgetRepo.remove(id, token);
export const createBudget = async (
  data: Omit<BudgetGoal, "id">,
  token: string,
) => {
  if (!data.category || data.category.trim() === "")
    throw new Error("Category required.");
  // Use data.limit or data.amount based on your type definitions
  return await budgetRepo.create(data, token);
};
