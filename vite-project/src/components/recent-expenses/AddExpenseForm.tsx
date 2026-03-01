import { useState } from "react";
import type { Expense, ExpenseCategory } from "../../types";
import "./AddExpenseForm.css";

type Props = {
  expenses: Expense[];
  onAdd: (expense: Omit<Expense, "id">) => void;
};

export const AddExpenseForm = ({ expenses, onAdd }: Props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Food");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !amount) {
      alert("Please fill in all fields");
      return;
    }

    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      tag: "manual",
      date: new Date().toISOString().slice(0, 10),
    });

    // Reset form
    setDescription("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>Add New Expense</h3>
      <p style={{fontSize: "0.8rem", marginBottom: "1rem", fontWeight: "bold"}}>
        Current Item Count: {expenses.length}
      </p>

      <div className="form-group">
        <label htmlFor="desc">Description:</label>
        <input
          id="desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Coffee"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amt">Amount ($):</label>
        <input
          id="amt"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cat">Category:</label>
        <select
          id="cat"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Housing">Housing</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
};
