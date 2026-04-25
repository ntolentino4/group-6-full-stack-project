import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as expenseRepo from "../apis/expenseRepo";
import type { Expense } from "../../../../shared/types";

export const useExpenses = () => {
  // 1. Hook into Clerk's authentication state
  const { getToken } = useAuth();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      // 2. Await the token immediately before the network request
      const token = await getToken();
      if (token) {
        const data = await expenseRepo.getAll(token);
        setExpenses(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch expenses.");
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (data: Omit<Expense, "id">) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Unauthorized");

      const newExp = await expenseRepo.create(data, token);
      setExpenses((prev) => [...prev, newExp]); // Instantly update UI
    } catch (err: any) {
      setError(err.message || "Failed to add expense.");
    }
  };

  const removeExpense = async (id: number) => {
    try {
      const token = await getToken();
      if (token) {
        await expenseRepo.remove(id, token);
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete expense.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, loading, error, addExpense, removeExpense };
};
