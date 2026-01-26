import type { Expense } from "../types";
import { CategorySummary } from "../components/category-summary/CategorySummary";

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

const CategoryTotalsPage = ({ expenses, setExpenses }: Props) => {
  const addTestExpense = () => {
    setExpenses((prev) => [
      {
        id: Date.now(),
        amount: 10,
        category: "Food",
        tag: "test",
        date: new Date().toISOString().slice(0, 10),
        description: "Test expense from CategoryTotalsPage",
      },
      ...prev,
    ]);
  };

  const removeOneExpense = () => {
    setExpenses((prev) => prev.slice(1));
  };

  return (
    <section>
      <h2>Category Totals Page</h2>

      <p>Total expenses (shared): {expenses.length}</p>

      <button onClick={addTestExpense}>Add Test Expense</button>
      <button onClick={removeOneExpense} disabled={expenses.length === 0}>
        Remove One Expense
      </button>

      <CategorySummary expenses={expenses} />
    </section>
  );
};

export default CategoryTotalsPage;
