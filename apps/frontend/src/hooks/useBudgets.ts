import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as budgetService from "../services/budgetService";
import type { BudgetGoal } from "../../../../shared/types";

export const useBudgets = () => {
  const { getToken } = useAuth();
  const [budgets, setBudgets] = useState<BudgetGoal[]>([]);

  const fetchBudgets = async () => {
    const token = await getToken();
    if (token) setBudgets(await budgetService.getBudgets(token));
  };

  const addBudget = async (data: Omit<BudgetGoal, "id">) => {
    const token = await getToken();
    if (!token) throw new Error("Unauthorized");
    const newBudget = await budgetService.createBudget(data, token);
    setBudgets((prev) => [...prev, newBudget]);
  };

  const removeBudget = async (id: number) => {
    const token = await getToken();
    if (token) {
      await budgetService.deleteBudget(id, token);
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);
  return { budgets, addBudget, removeBudget, fetchBudgets };
};
