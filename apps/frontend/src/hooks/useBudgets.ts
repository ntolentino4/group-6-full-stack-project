import { useState, useEffect, useCallback } from "react";
import type { BudgetGoal, ExpenseCategory } from "../../../../shared/types";
import budgetService from "../services/budgetService";

/**
 * Hook to manage budget operations and state.
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

  const addBudget = async (category: ExpenseCategory, limitAmount: string) => {
    try {
      // Use the Service instead of Repo directly to trigger validation logic
      await budgetService.addBudget(
        category,
        Number(limitAmount),
        budgetGoals
      );

      await refreshBudgets(); // Refresh list from DB
      return true;
    } catch (error) {
      console.error("Failed to add budget", error);
      return false;
    }
  };

  const removeBudget = async (id: number) => {
    try {
      // Use the Service deleteBudget which is now linked to repo.remove
      await budgetService.deleteBudget(id);

      // Optimistic UI update
      setBudgetGoals((prevBudgets) =>
        prevBudgets.filter((budget) => budget.id !== id),
      );
    } catch (error) {
      console.error("Failed to remove budget:", error);
    }
  };

  return { budgetGoals, addBudget, removeBudget };
};