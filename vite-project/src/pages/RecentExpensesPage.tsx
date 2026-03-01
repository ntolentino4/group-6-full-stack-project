import { RecentExpenses } from "../components/recent-expenses/RecentExpenses";
import { AddExpenseForm } from "../components/recent-expenses/AddExpenseForm";
import { useExpenses } from "../hooks/useExpenses";

function RecentExpensesPage() {
  const { expenses, addExpense, removeExpense } = useExpenses();

  return (
    <section>
      <AddExpenseForm expenses={expenses} onAdd={addExpense} />
      <RecentExpenses expenses={expenses} onRemove={removeExpense} />
    </section>
  );
}

export default RecentExpensesPage;
