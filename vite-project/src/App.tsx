import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ExpenseFilterPage from "./pages/ExpenseFilterPage";
import RecentExpensesPage from "./pages/RecentExpensesPage";
import CategoryTotalsPage from "./pages/CategoryTotalsPage";

import { mockExpenses } from "./data/mockExpenses";
import type { Expense, BudgetGoal } from "./types";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>([]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/expense-filter" element={<ExpenseFilterPage />} />

        <Route
          path="/recent-expenses"
          element={
            <RecentExpensesPage expenses={expenses} setExpenses={setExpenses} />
          }
        />

        <Route
          path="/category-totals"
          element={
            <CategoryTotalsPage
              expenses={expenses}
              setExpenses={setExpenses}
              budgetGoals={budgetGoals}
              setBudgetGoals={setBudgetGoals}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
