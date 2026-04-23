import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { ExpenseCategory } from "../../../../../shared/types";
import "./AddExpenseForm.css";

export const AddExpenseForm = () => {
  const { getToken, isSignedIn } = useAuth();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Food");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !amount) {
      alert("Please fill in all fields");
      return;
    }

    if (!isSignedIn) {
        alert("Please sign in to add expenses");
        return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          category,
          tag: "manual",
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      if (response.ok) {
        // Optional: Refresh the page or use a shared state to update the list
        window.location.reload(); 
        setDescription("");
        setAmount("");
        setCategory("Food");
      }
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  if (!isSignedIn) return null;

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>Add New Expense</h3>
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