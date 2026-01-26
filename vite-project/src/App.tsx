import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/HomePage";
import ExpenseFilterPage from "./pages/ExpenseFilterPage";
import RecentExpensesPage from "./pages/RecentExpensesPage";
import CategoryTotalsPage from "./pages/CategoryTotalsPage";

import { mockExpenses } from "./data/mockExpenses";
import type { Expense } from "./types";




function App() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);


  return (
    <div className="app-container">
      <Header />

      <Routes>
        <Route
          path="/"
          element={<HomePage/>}
        />
        <Route
          path="/recent-expenses"
          element={<RecentExpensesPage expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route
          path="/expense-filter"
          element={<ExpenseFilterPage expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route
          path="/category-totals"
          element={<CategoryTotalsPage expenses={expenses} setExpenses={setExpenses} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;