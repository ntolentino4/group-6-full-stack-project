import { useState, useEffect } from "react";
import * as ExpenseService from "../services/expenseService"; 
import type { Expense } from "../types";

/**
 * Custom Hook: useExpenses
 * Manages the presentation logic and state for the expense list.
 * * @returns {Expense[]} expenses - The current list of expenses.
 * @returns {string | null} error - Any error messages from operations.
 * @returns {Function} addExpense - Validates and adds a new expense.
 * @returns {Function} removeExpense - Deletes an expense by ID.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await ExpenseService.getAllExpenses();
        setExpenses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load expenses.");
      }
    };

    loadData();
  }, []);

  const addExpense = async (newExpense: Expense) => {
    try {
      setError(null); 
      const savedExpense = await ExpenseService.addExpense(newExpense);
      setExpenses((prev) => [savedExpense, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add expense.");
    }
  };

  const removeExpense = async (id: number) => {
    try {
      await ExpenseService.deleteExpense(id);
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete expense.");
    }
  };

  return { expenses, error, addExpense, removeExpense };
}