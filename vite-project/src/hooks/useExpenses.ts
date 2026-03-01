import { useState, useEffect, useCallback } from "react";
import type { Expense } from "../types";
import {
  getAllExpenses,
  addExpense as serviceAddExpense,
  deleteExpense,
} from "../services/expenseService";

/**
 * Custom Hook: useExpenses
 * Manages the presentation logic and state for the expense list.
 * * @returns {Expense[]} expenses - The current list of expenses fetched from the service.
 * @returns {Function} addExpense - Takes a new expense (without an ID), generates an ID, and saves it.
 * @returns {Function} removeExpense - Deletes an expense by its ID and refreshes the list.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const refreshExpenses = useCallback(async () => {
    const data = await getAllExpenses();
    setExpenses(data);
  }, []);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const addExpense = async (expense: Omit<Expense, "id">) => {
    try {
      const newExpense: Expense = { ...expense, id: Date.now() };
      await serviceAddExpense(newExpense);
      await refreshExpenses();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const removeExpense = async (id: number) => {
    await deleteExpense(id);
    await refreshExpenses();
  };

  return { expenses, addExpense, removeExpense };
}