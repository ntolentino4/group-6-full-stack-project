import { useState } from "react";
import type { ExpenseCategory } from "../types";
import ExpenseFilter from "../components/expense-filter/ExpenseFilter";
import { useExpenses } from "../hooks/useExpenses";

const ExpenseFilterPage = () => {
  const { expenses, addExpense, removeExpense } = useExpenses();
  const [selectedCategories, setSelectedCategories] = useState<ExpenseCategory[]>(["Shopping"]);

  /* Demo: modify shared expenses list (for testing shared state across pages) */
  const addTestExpense = () => {
    addExpense({
      amount: 5,
      category: "Shopping",
      tag: "filter-test",
      date: new Date().toISOString().slice(0, 10),
      description: "Test expense from ExpenseFilterPage",
    });
  };

  const removeOneExpense = () => {
    if (expenses.length > 0) removeExpense(expenses[0].id);
  };

  return (
    <section>
      <h2>Expense Filter Page</h2>

      <p>Total expenses (shared): {expenses.length}</p>

      <button onClick={addTestExpense}>Add Test Expense</button>
      <button onClick={removeOneExpense} disabled={expenses.length === 0}>
        Remove One Expense
      </button>

      <ExpenseFilter
        expenses={expenses}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </section>
  );
};

export default ExpenseFilterPage;
