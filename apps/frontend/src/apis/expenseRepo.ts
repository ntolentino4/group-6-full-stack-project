import { fetchWithAuth } from "./apiClient";
import type { Expense } from "../../../../shared/types"; 

export const getAll = async (token: string): Promise<Expense[]> => {
  return await fetchWithAuth("/expenses", { method: "GET" }, token);
};

export const create = async (data: Omit<Expense, 'id'>, token: string): Promise<Expense> => {
  return await fetchWithAuth("/expenses", { 
    method: "POST", 
    body: JSON.stringify(data) 
  }, token);
};

export const remove = async (id: number, token: string): Promise<void> => {
  return await fetchWithAuth(`/expenses/${id}`, { method: "DELETE" }, token);
};