import { useState } from "react";
import type { ExpenseCategory, BudgetGoal } from "../types";
import { CategorySummary } from "../components/category-summary/CategorySummary";
import ListPanel from "../components/shared/ListPanel";
import { useExpenses } from "../hooks/useExpenses";

import "../components/category-summary/CategorySummary.css";

type Props = {
  budgetGoals: BudgetGoal[];
  setBudgetGoals: React.Dispatch<React.SetStateAction<BudgetGoal[]>>;
};

const ALL_CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Shopping",
  "Health",
];

const CategoryTotalsPage = ({ budgetGoals, setBudgetGoals }: Props) => {
  const { expenses, addExpense, removeExpense } = useExpenses();
  const [formCategory, setFormCategory] = useState<ExpenseCategory | "">("");
  const [formAmount, setFormAmount] = useState<string>("");

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCategory || !formAmount) return;

    if (budgetGoals.some((b) => b.category === formCategory)) {
      alert(`You already have a budget for ${formCategory}`);
      return;
    }

    const newBudget: BudgetGoal = {
      id: Date.now(),
      category: formCategory,
      limit: parseFloat(formAmount),
    };

    setBudgetGoals((prev) => [...prev, newBudget]);

    setFormCategory("");
    setFormAmount("");
  };

  const handleRemoveBudget = (id: number) => {
    setBudgetGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const addTestExpense = () => {
    addExpense({
      amount: 10,
      category: "Food",
      tag: "test",
      date: new Date().toISOString().slice(0, 10),
      description: "Test expense from CategoryTotalsPage",
    });
  };

  const removeOneExpense = () => {
    if (expenses.length > 0) removeExpense(expenses[0].id);
  };

  return (
    <section>
      <h2>Category Totals & Budgets</h2>
      <p>Total expenses (shared): {expenses.length}</p>

      <div className="controls-container">
        <button onClick={addTestExpense}>Add Test Expense</button>
        <button onClick={removeOneExpense} disabled={expenses.length === 0}>
          Remove One Expense
        </button>
      </div>

      <ListPanel title="Budget Planner">
        <form onSubmit={handleAddBudget} className="budget-form">
          <select
            value={formCategory}
            onChange={(e) => setFormCategory(e.target.value as ExpenseCategory)}
            required
            aria-label="Select Category"
          >
            <option value="">-- Select Category --</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Limit Amount ($)"
            value={formAmount}
            onChange={(e) => setFormAmount(e.target.value)}
            min="1"
            required
            className="budget-input"
            aria-label="Budget Limit Amount"
          />

          <button type="submit">Set Goal</button>
        </form>

        <h3>Active Monthly Budgets</h3>

        {budgetGoals.length === 0 ? (
          <p className="empty-state">No budgets set yet.</p>
        ) : (
          <ul className="budget-list">
            {budgetGoals.map((goal) => (
              <li key={goal.id} className="budget-item">
                <span>
                  <strong>{goal.category}</strong>: Target limit of $
                  {goal.limit.toFixed(2)}
                </span>
                <button
                  onClick={() => handleRemoveBudget(goal.id)}
                  className="remove-budget-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </ListPanel>

      <br />

      <CategorySummary expenses={expenses} budgetGoals={budgetGoals} />
    </section>
  );
};

export default CategoryTotalsPage;
