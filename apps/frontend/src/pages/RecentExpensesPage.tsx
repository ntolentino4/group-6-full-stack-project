import React from 'react';
import { RecentExpenses } from "../components/recent-expenses/RecentExpenses";
import { AddExpenseForm } from "../components/recent-expenses/AddExpenseForm";

function RecentExpensesPage() {
  return (
    <section>
      <AddExpenseForm />
      <RecentExpenses />
    </section>
  );
}

export default RecentExpensesPage;