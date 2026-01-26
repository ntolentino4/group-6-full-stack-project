import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ExpenseFilterPage from "./pages/ExpenseFilterPage";
import RecentExpensesPage from "./pages/RecentExpensesPage";
import CategoryTotalsPage from "./pages/CategoryTotalsPage";

import { mockExpenses } from "./data/mockExpenses";
import type { Expense } from "./types";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/expense-filter"
          element={<ExpenseFilterPage expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route
          path="/recent-expenses"
          element={<RecentExpensesPage expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route
          path="/category-totals"
          element={<CategoryTotalsPage expenses={expenses} setExpenses={setExpenses} />}
        />
      </Route>
    </Routes>
  );
}

export default App;