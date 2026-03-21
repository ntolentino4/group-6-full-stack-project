import type { Expense, ExpenseCategory } from "../../../../../shared/types";
import "./ExpenseFilter.css";
import ListPanel from "../shared/ListPanel";

const ALL_CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Shopping",
  "Health",
];

type Props = {
  expenses: Expense[];
  selectedCategories: ExpenseCategory[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<ExpenseCategory[]>>;
};

function ExpenseFilter({
  expenses,
  selectedCategories,
  setSelectedCategories,
}: Props) {
  const handleAddCategory = (category: ExpenseCategory) => {
    if (selectedCategories.includes(category)) return;
    setSelectedCategories((prev) => [...prev, category]);
  };

  const handleRemoveCategory = (category: ExpenseCategory) => {
    setSelectedCategories((prev) =>
      prev.filter((selectedCategory) => selectedCategory !== category)
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(expense.category)
  );

  return (
    <ListPanel title="Filter by Category">
      <p>Total expenses (shared): {expenses.length}</p>

      <label htmlFor="category-select">Add category to filter: </label>
      <select
        id="category-select"
        value=""
        onChange={(event) => {
          const value = event.target.value as ExpenseCategory;
          if (value) handleAddCategory(value);
        }}
      >
        <option value="">-- Add a category --</option>
        {ALL_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <p>Selected categories:</p>
      <ul>
        {selectedCategories.map((category) => (
          <li key={category}>
            {category}{" "}
            <button onClick={() => handleRemoveCategory(category)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleReset}>
        Reset selections
      </button>

      <p>Filtered expenses ({filteredExpenses.length}):</p>
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