import type { Expense } from "../../../../../shared/types";
import ListPanel from "../shared/ListPanel";
import "./RecentExpenses.css";

type Props = {
  expenses: Expense[];
  onRemove: (id: number) => void;
};

export const RecentExpenses = ({ expenses, onRemove }: Props) => {
  const recentItems = [...expenses]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <ListPanel title="Recent Transactions">
      <div className="expense-list">
        {recentItems.length === 0 ? (
          <p>No recent expenses found.</p>
        ) : (
          recentItems.map((item) => (
            <article key={item.id} className="expense-item">
              <div className="expense-info">
                <h3>{item.description}</h3>
                <small>
                  {item.date} • {item.category}
                </small>
              </div>

              <div className="expense-actions">
                <span className="price">${item.amount.toFixed(2)}</span>
                <button
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove expense"
                >
                  Remove
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </ListPanel>
  );
};
