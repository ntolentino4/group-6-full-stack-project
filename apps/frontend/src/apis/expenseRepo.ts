import type { Expense } from "../../../../shared/types";


const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getAllExpenses(): Promise<Expense[]> {
  // GET request to your new backend endpoint
  const response = await fetch(`${API_URL}/api/expenses`);
  if (!response.ok) throw new Error("Failed to fetch expenses");
  return await response.json();
}

export async function addExpense(expense: Omit<Expense, "id">): Promise<Expense> {
  // POST request to save to PostgreSQL
  const response = await fetch(`${API_URL}/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!response.ok) throw new Error("Failed to add expense");
  return await response.json();
}

export async function deleteExpense(id: number): Promise<void> {
  // DELETE request to remove from PostgreSQL
  const response = await fetch(`${API_URL}/api/expenses/${id}`, { 
    method: "DELETE" 
  });
  if (!response.ok) throw new Error("Failed to delete expense");
}