import { useState, useEffect, useCallback } from "react";
import type { Expense } from "../types";
import {
  getAllExpenses,
  addExpense as serviceAddExpense,
  deleteExpense,
} from "../services/expenseService";

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
