import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import type { Expense } from "../../../../../shared/types";
import ListPanel from "../shared/ListPanel";
import "./RecentExpenses.css";

// REMOVED: type Props = { ... } since we are fetching internal state now

export const RecentExpenses = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!isLoaded || !isSignedIn) return;
      try {
        const token = await getToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setExpenses(data);
        }
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      }
    };
    fetchExpenses();
  }, [getToken, isLoaded, isSignedIn]);

  const handleRemove = async (id: number) => {
    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setExpenses(prev => prev.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  if (!isSignedIn) return null;

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
                  onClick={() => handleRemove(item.id)} 
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
