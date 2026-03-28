import { useState, useEffect } from "react";
import type { Expense } from "../../../../shared/types";
import * as expenseRepo from "../apis/expenseRepo";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await expenseRepo.getAllExpenses();
        setExpenses(data);
      } catch {
        // No variable named 'error' means nothing to be 'unused'
        console.error("Failed to fetch expenses from server.");
      }
    };
    loadInitialData();
  }, []);

  const addExpense = async (newExpenseData: Omit<Expense, "id">) => {
    try {
      const savedExpense = await expenseRepo.addExpense(newExpenseData);
      setExpenses((prev) => [savedExpense, ...prev]);
    } catch {
      alert("Error saving expense to database");
    }
  };

  const removeExpense = async (id: number) => {
    try {
      await expenseRepo.deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Error deleting expense");
    }
  };

  return {
    expenses,
    addExpense,
    removeExpense,
  };
};