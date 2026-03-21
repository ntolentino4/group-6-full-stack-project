import { useState, useEffect, useCallback } from "react";
import type { BudgetGoal } from "../../../../shared/types";
import budgetService from "../services/budgetService";

/**
 * Hook to manage budget operations and state.
 * @returns {Object}
 * @property {BudgetGoal[]} budgetGoals - The current list of budget goals.
 * @property {Function} addBudget - Validates and sends a new budget to the service.
 * @property {Function} removeBudget - Deletes a budget by its ID.
 */
export const useBudgets = () => {
  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>([]);

  const refreshBudgets = useCallback(async () => {
    const data = await budgetService.getBudgets();
    setBudgetGoals(data);
  }, []);

  useEffect(() => {
    refreshBudgets();
  }, [refreshBudgets]);

  const addBudget = async (category: string, limit: string | number) => {
    try {
      const numericLimit =
        typeof limit === "string" ? parseFloat(limit) : limit;

      await budgetService.addBudget(category, numericLimit, budgetGoals);
      await refreshBudgets();
      return true;
    } catch (error) {
      alert((error as Error).message);
      return false;
    }
  };

  const removeBudget = async (id: number) => {
    await budgetService.deleteBudget(id);
    await refreshBudgets();
  };

  return { budgetGoals, addBudget, removeBudget };
};
