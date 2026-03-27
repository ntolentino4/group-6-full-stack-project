import { useState, useEffect, useCallback } from "react";
import type { BudgetGoal, ExpenseCategory } from "../../../../shared/types";
import budgetService from "../services/budgetService";
import budgetRepository from "../apis/budgetRepo";

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

  const addBudget = async (category: ExpenseCategory, limitAmount: string) => {
    try {
      // Wrap limitAmount in Number() so it sends 199 instead of "199"
      const newBudget = await budgetRepository.add({
        category,
        limit: Number(limitAmount),
      });

      setBudgetGoals((prev) => [...prev, newBudget]);
      return true;
    } catch (error) {
      console.error("Failed to add budget", error);
      return false;
    }
  };

  const removeBudget = async (id: number) => {
    try {
      // 1. Tell the backend to delete it from PostgreSQL
      await budgetRepository.remove(id);

      // 2. Tell React to remove it from the screen immediately
      setBudgetGoals((prevBudgets) =>
        prevBudgets.filter((budget) => budget.id !== id),
      );
    } catch (error) {
      console.error("Failed to remove budget:", error);
    }
  };

  return { budgetGoals, addBudget, removeBudget };
};
