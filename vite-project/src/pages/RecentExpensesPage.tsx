import { RecentExpenses } from "../components/recent-expenses/RecentExpenses";
import { AddExpenseForm } from "../components/recent-expenses/AddExpenseForm";
import { useExpenses } from "../hooks/useExpenses";

/* =========================================================================
 * How and why does this component use the new architecture?
 * * WHY: This page component acts as the central hub for the recent expenses 
 * feature. To avoid mixing UI rendering logic with business logic or direct 
 * data mutation, it delegates all state management to a custom hook.
 * * HOW: It invokes the `useExpenses()` custom hook. The hook provides the 
 * presentation state (`expenses`) and the action functions (`addExpense`, 
 * `removeExpense`). The component then passes these down to `AddExpenseForm` 
 * and `RecentExpenses` as props. When a user interacts with the UI, the hook 
 * processes the request, calls `expenseService.ts` for business validation, 
 * which in turn calls `expenseRepo.ts` to mutate the mock data layer.
 * ========================================================================= */

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