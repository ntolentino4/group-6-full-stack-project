import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { CategorySummary } from "./components/category-summary/CategorySummary";
import ExpenseFilter from './components/expense-filter/ExpenseFilter';

function App() {
  return (
    <div className="app-container">
      <main>
        <Header />
        <CategorySummary />
        <ExpenseFilter />
        <Footer />
      </main>
    </div>
  );
}

export default App
