import { useState } from "react";
import type { Expense } from "../types";
import { expenseService } from "../services/expenseService";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    expenseService.getAll()
  );

  const addExpense = (expense: Omit<Expense, "id">) => {
    expenseService.add(expense);
    setExpenses(expenseService.getAll());
  };

  const removeExpense = (id: number) => {
    expenseService.remove(id);
    setExpenses(expenseService.getAll());
  };

  return { expenses, addExpense, removeExpense };
}
