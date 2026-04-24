import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as expenseService from "../services/expenseService";
import type { Expense } from "../../../../shared/types";

export const useExpenses = () => {
  const { getToken } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    const token = await getToken();
    if (token) setExpenses(await expenseService.getAllExpenses(token));
  };

  const addExpense = async (data: Omit<Expense, 'id'>) => {
    const token = await getToken();
    if (!token) throw new Error("Unauthorized");
    const newExp = await expenseService.createExpense(data, token);
    setExpenses(prev => [...prev, newExp]);
  };

  const removeExpense = async (id: number) => {
    const token = await getToken();
    if (token) {
      await expenseService.deleteExpense(id, token);
      setExpenses(prev => prev.filter(e => e.id !== id));
    }
  };

  useEffect(() => { fetchExpenses(); }, []);
  return { expenses, addExpense, removeExpense, fetchExpenses };
};