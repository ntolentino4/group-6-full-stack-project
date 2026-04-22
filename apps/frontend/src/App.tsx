import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ExpenseFilterPage from "./pages/ExpenseFilterPage";
import RecentExpensesPage from "./pages/RecentExpensesPage";
import CategoryTotalsPage from "./pages/CategoryTotalsPage";

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/expense-filter" element={<ExpenseFilterPage />} />
        <Route path="/recent-expenses" element={<RecentExpensesPage />} />
        
        <Route path="/category-totals" element={<CategoryTotalsPage />} />
      </Route> 
    </Routes>
  );
}

export default App;