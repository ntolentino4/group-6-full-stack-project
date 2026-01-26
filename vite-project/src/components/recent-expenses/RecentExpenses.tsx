import type { Expense } from "../../types";
import "./RecentExpenses.css";

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

export const RecentExpenses = ({ expenses, setExpenses }: Props) => {
  // Requirement: show 3–5 items (we show the 5 most recent by date)
  const recentItems = [...expenses]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const handleRemove = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <section className="recent-expenses">
      <h2>Recent Expenses</h2>

      <p>Total expenses (shared): {expenses.length}</p>

      <div className="expense-list">
        {recentItems.map((item) => (
          <article key={item.id} className="expense-item">
            <h3>{item.description}</h3>

            <p>
              <strong>Amount:</strong> ${item.amount.toFixed(2)}
            </p>

            <p>
              <strong>Category:</strong> {item.category} ({item.tag})
            </p>

            <p>
              <strong>Date:</strong> {item.date}
            </p>

            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </article>
        ))}
      </div>
    </section>
  );
};
