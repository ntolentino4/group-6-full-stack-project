import React from "react";
import type { Expense } from "../types";
import { RecentExpenses } from "../components/recent-expenses/RecentExpenses";
import { AddExpenseForm } from "../components/recent-expenses/AddExpenseForm";

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

function RecentExpensesPage({ expenses, setExpenses }: Props) {
  

  const handleRemoveExpense = (id: number) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section>
      <AddExpenseForm expenses={expenses} setExpenses={setExpenses} />
      
      <RecentExpenses expenses={expenses} onRemove={handleRemoveExpense} />
    </section>
  );
}

export default RecentExpensesPage;
