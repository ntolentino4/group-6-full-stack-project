import { mockExpenses } from "../../data/mockExpenses.tsx";
import "./RecentExpenses.css";

export const RecentExpenses = () => {
  // Requirement: Minimum 3-5 items
  const recentItems = mockExpenses.slice(0, 5);

  return (
    <section className="recent-expenses">
      <h2>Recent Expenses</h2>
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
          </article>
        ))}
      </div>

      
    </section>
  );
};
