import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { CategorySummary } from "./components/category-summary/CategorySummary";
import ExpenseFilter from './components/expense-filter/ExpenseFilter';
import { RecentExpenses } from "./components/recent-expenses/RecentExpenses";

function App() {
  return (
    <div className="app-container">
      <main>
        <Header />
        <CategorySummary />
        <ExpenseFilter />
        <RecentExpenses />
        <Footer />
      </main>
    </div>
  );
}

export default App
