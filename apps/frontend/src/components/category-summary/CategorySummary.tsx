import type { Expense, BudgetGoal } from "../../../../../shared/types";
import "./CategorySummary.css";

type Props = {
  expenses: Expense[];
  budgetGoals?: BudgetGoal[];
};

export const CategorySummary = ({ expenses, budgetGoals = [] }: Props) => {
  const categoryTotals = expenses.reduce(
    (acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const categories = Object.keys(categoryTotals);
  const overallTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const highestCategory =
    categories.length > 0
      ? categories.reduce((prev, current) =>
          categoryTotals[current] > categoryTotals[prev] ? current : prev,
        )
      : null;

  const budgetLookup = budgetGoals.reduce(
    (acc, curr) => {
      acc[curr.category] = curr.limit;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <section className="category-summary">
      <h2>Expense Category Summary</h2>
      <p>Total expenses (shared): {expenses.length}</p>

      <ul>
        {categories.map((cat) => {
          const amount = categoryTotals[cat];
          const budget = budgetLookup[cat];

          const isHighest = cat === highestCategory;
          const isOverBudget = budget !== undefined && amount > budget;

          let itemClass = "";
          if (isHighest) itemClass = "highest-spending";
          if (isOverBudget) itemClass = "over-budget";

          return (
            <li key={cat} className={itemClass}>
              <div className="summary-row">
                <span className="cat-name">{cat}</span>
                <span className="cat-amount">${amount.toFixed(2)}</span>
              </div>

              {budget !== undefined && (
                <div className="budget-context">
                  <small>
                    Target: ${budget.toFixed(2)}
                    {isOverBudget && (
                      <span className="alert-text"> (OVER BUDGET)</span>
                    )}
                  </small>
                  <div className="progress-bar-bg">
                    <div
                      className={`progress-bar-fill ${isOverBudget ? "fill-danger" : "fill-success"}`}
                      style={{
                        width: `${Math.min((amount / budget) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {isHighest && !isOverBudget && (
                <div className="badge">Highest Spending!</div>
              )}
            </li>
          );
        })}
      </ul>

      <p className="overall-total">
        <strong>Overall Total: ${overallTotal.toFixed(2)}</strong>
      </p>
    </section>
  );
};
