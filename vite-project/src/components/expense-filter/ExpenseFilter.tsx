import { useState } from "react";
import type { Expense, ExpenseCategory } from "../../types";
import "./ExpenseFilter.css";
import ListPanel from '../shared/ListPanel';

type Props = {
  expenses: Expense[];
};

function ExpenseFilter({ expenses }: Props) {
  // Default category state "Shopping"
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory>("Shopping");

  // Filter the expenses by the selected category
  const filteredExpenses = expenses.filter(
    (expense) => expense.category === selectedCategory
  );

  return (
    <ListPanel title="Filter by Category">
      {/* T.3 display shared state */}
      <p>Total expenses (shared): {expenses.length}</p>

      <label htmlFor="category-select">Select Category: </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value as ExpenseCategory)}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Housing">Housing</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Health">Health</option>
      </select>

      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} ({expense.date})
          </li>
        ))}
      </ul>
    </ListPanel>
  );
}

export default ExpenseFilter;