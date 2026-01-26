import type React from "react";
import type { Expense } from "../types";
import { RecentExpenses } from "../components/recent-expenses/RecentExpenses";

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

function RecentExpensesPage({ expenses, setExpenses }: Props) {
  const addTestExpense = () => {
    setExpenses((prev) => [
      {
        id: Date.now(),
        amount: 9.99,
        category: "Food",
        tag: "demo",
        date: new Date().toISOString().slice(0, 10),
        description: "Test expense from RecentExpensesPage",
      },
      ...prev,
    ]);
  };

  const removeOneExpense = () => {
    setExpenses((prev) => prev.slice(1));
  };

  return (
    <section>
      <h2>Recent Expenses</h2>

      <p>Total expenses (shared): {expenses.length}</p>

      <button onClick={addTestExpense}>Add Test Expense</button>
      <button onClick={removeOneExpense} disabled={expenses.length === 0}>
        Remove One Expense
      </button>

      <RecentExpenses expenses={expenses} setExpenses={setExpenses} />
    </section>
  );
}

export default RecentExpensesPage;
