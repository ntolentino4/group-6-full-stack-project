import { useState } from "react";
import type { ExpenseCategory } from "../../../../shared/types";
import ExpenseFilter from "../components/expense-filter/ExpenseFilter";
import { useExpenses } from "../hooks/useExpenses";
import { useFilterPresets } from "../hooks/useFilterPresets";

/**
 * This page uses the hook useFilterPresets which calls the filter preset service,
 * then it calls the filter preset repository. Saved presets are loaded and saved
 * through that architecture
 */
const ExpenseFilterPage = () => {
  const { expenses, addExpense, removeExpense } = useExpenses();
  const { presets, addPreset } = useFilterPresets();
  const [selectedCategories, setSelectedCategories] = useState<ExpenseCategory[]>(["Shopping"]);
  const [presetName, setPresetName] = useState("");

  const handlePresetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id) {
      const preset = presets.find((p) => p.id === Number(id));
      if (preset) setSelectedCategories(preset.selectedCategories);
    }
  };

  const handleSavePreset = () => {
    const name = presetName.trim();
    if (!name) return;
    addPreset({ name, selectedCategories: [...selectedCategories] });
    setPresetName("");
  };

  /* Demo: modify shared expenses list (for testing shared state across pages) */
  const addTestExpense = () => {
    addExpense({
      amount: 5,
      category: "Shopping",
      tag: "filter-test",
      date: new Date().toISOString().slice(0, 10),
      description: "Test expense from ExpenseFilterPage",
    });
  };

  const removeOneExpense = () => {
    if (expenses.length > 0) removeExpense(expenses[0].id);
  };

  return (
    <section>
      <h2>Expense Filter Page</h2>

      <p>Total expenses (shared): {expenses.length}</p>

      <button onClick={addTestExpense}>Add Test Expense</button>
      <button onClick={removeOneExpense} disabled={expenses.length === 0}>
        Remove One Expense
      </button>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="preset-select">Saved presets: </label>
        <select
          id="preset-select"
          defaultValue=""
          onChange={handlePresetSelect}
          aria-label="Select a saved filter preset"
        >
          <option value="">-- Select a preset --</option>
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        <label htmlFor="preset-name">Save as preset: </label>
        <input
          id="preset-name"
          type="text"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          placeholder="Preset name"
          aria-label="Preset name"
        />
        <button type="button" onClick={handleSavePreset}>
          Save as preset
        </button>
      </div>

      <ExpenseFilter
        expenses={expenses}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </section>
  );
};

export default ExpenseFilterPage;
