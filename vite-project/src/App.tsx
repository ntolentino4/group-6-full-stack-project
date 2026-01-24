import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import ExpenseFilterPage from "./pages/ExpenseFilterPage";
import RecentExpensesPage from "./pages/RecentExpensesPage";
import CategoryTotalsPage from "./pages/CategoryTotalsPage";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/expense-filter" element={<ExpenseFilterPage />} />
        <Route path="/recent-expenses" element={<RecentExpensesPage />} />
        <Route path="/category-totals" element={<CategoryTotalsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
