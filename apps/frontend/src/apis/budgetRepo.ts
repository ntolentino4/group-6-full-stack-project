import type { BudgetGoal } from "../../../../shared/types";
import { fetchWithAuth } from "./apiClient";

export const getAll = async (token: string): Promise<BudgetGoal[]> => {
  return await fetchWithAuth("/budgets", { method: "GET" }, token);
};

export const create = async (
  data: Omit<BudgetGoal, "id">,
  token: string,
): Promise<BudgetGoal> => {
  return await fetchWithAuth(
    "/budgets",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token,
  );
};

export const remove = async (id: number, token: string): Promise<void> => {
  return await fetchWithAuth(`/budgets/${id}`, { method: "DELETE" }, token);
};
