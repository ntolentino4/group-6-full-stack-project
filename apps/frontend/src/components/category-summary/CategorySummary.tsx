import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import ListPanel from "../shared/ListPanel";
import "./CategorySummary.css";

interface BudgetSummary {
  categoryId: number;
  categoryName: string;
  limit: number;
  spent: number;
  remaining: number;
}

export default function CategorySummary() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [summary, setSummary] = useState<BudgetSummary[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!isLoaded || !isSignedIn) return;
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/my-budgets`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setSummary(data);
        }
      } catch (err) {
        console.error("Failed to fetch budget summary", err);
      }
    };
    fetchBudgets();
  }, [getToken, isLoaded, isSignedIn]);

  if (!isSignedIn) return null;

  return (
    <ListPanel title="My Budget Progress">
      <div className="budget-grid">
        {summary.map((item) => (
          <div key={item.categoryId} className="budget-card">
            <h3>{item.categoryName}</h3>
            <p>
              Spent: ${item.spent.toFixed(2)} / ${item.limit.toFixed(2)}
            </p>
            <div className={`status ${item.remaining < 0 ? "over" : "under"}`}>
              Remaining: ${item.remaining.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </ListPanel>
  );
}
