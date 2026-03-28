import type { BudgetGoal } from "../../../../shared/types";
const API_URL = `${import.meta.env.VITE_API_URL}/api/budgets`;

const budgetRepository = {
  getAll: async (): Promise<BudgetGoal[]> => {
    const res = await fetch(API_URL);
    return await res.json();
  },
  add: async (budget: Omit<BudgetGoal, "id">): Promise<BudgetGoal> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    });
    return await res.json();
  },
  remove: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
export default budgetRepository;
