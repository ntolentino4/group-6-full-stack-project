import { useState } from "react";
import type { Expense, ExpenseCategory } from "../types";
import ExpenseFilter from "../components/expense-filter/ExpenseFilter";

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

const ExpenseFilterPage = ({ expenses, setExpenses }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<ExpenseCategory[]>(["Shopping"]);

  /* Demo: modify shared expenses list (for testing shared state across pages) */
  const addTestExpense = () => {
    setExpenses((prev) => [
      {
        id: Date.now(),
        amount: 5,
        category: "Shopping",
        tag: "filter-test",
        date: new Date().toISOString().slice(0, 10),
        description: "Test expense from ExpenseFilterPage",
      },
      ...prev,
    ]);
  };

  const removeOneExpense = () => {
    setExpenses((prev) => prev.slice(1));
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
