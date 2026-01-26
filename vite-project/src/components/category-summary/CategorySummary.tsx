import type { Expense } from "../../types";
import "./CategorySummary.css";

type Props = {
  expenses: Expense[];
};

export const CategorySummary = ({ expenses }: Props) => {
  const categoryTotals = expenses.reduce(
    (acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const categories = Object.keys(categoryTotals);
  const overallTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const highestCategory =
    categories.length > 0
      ? categories.reduce((prev, current) =>
          categoryTotals[current] > categoryTotals[prev] ? current : prev
        )
      : null;

  return (
    <section className="category-summary">
      <h2>Expense Category Summary</h2>

      {/* T.3 display shared state */}
      <p>Total expenses (shared): {expenses.length}</p>

      <ul>
        {categories.map((cat) => (
          <li
            key={cat}
            className={cat === highestCategory ? "highest-spending" : ""}
          >
            {cat}: ${categoryTotals[cat].toFixed(2)}
            {cat === highestCategory && " (Highest Spending!)"}
          </li>
        ))}
      </ul>

      <p className="overall-total">
        <strong>Overall Total: ${overallTotal.toFixed(2)}</strong>
      </p>
    </section>
  );
};
