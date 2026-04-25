import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
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
  const { isLoaded, isSignedIn } = useAuth();
  const {
    expenses,
    addExpense,
    removeExpense,
    loading: expensesLoading,
    error: expensesError,
  } = useExpenses();
  const {
    presets,
    addPreset,
    removePreset,
    loading: presetsLoading,
    error: presetsError,
  } = useFilterPresets();
  const [selectedCategories, setSelectedCategories] = useState<
    ExpenseCategory[]
  >(["Shopping"]);
  const [presetName, setPresetName] = useState("");
  const [presetSelectValue, setPresetSelectValue] = useState("");

  const handlePresetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setPresetSelectValue(id);
    if (id) {
      const preset = presets.find((p) => p.id === Number(id));
      if (preset) {
        setSelectedCategories(
          preset.selectedCategories as ExpenseCategory[],
        );
        queueMicrotask(() => setPresetSelectValue(""));
      }
    }
  };

  const handleSavePreset = async () => {
    const name = presetName.trim();
    if (!name) return;
    const ok = await addPreset({
      name,
      selectedCategories: [...selectedCategories],
    });
    if (ok) setPresetName("");
  };

  const handleDeletePreset = async (id: number) => {
    await removePreset(id);
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

      {expensesLoading && <p aria-live="polite">Loading expenses…</p>}
      {expensesError && (
        <p role="alert" style={{ color: "crimson" }}>
          Expenses: {expensesError}
        </p>
      )}

      <p>Total expenses (shared): {expenses.length}</p>

      <button onClick={addTestExpense}>Add Test Expense</button>
      <button onClick={removeOneExpense} disabled={expenses.length === 0}>
        Remove One Expense
      </button>

      <div style={{ marginTop: "1rem" }}>
        {isLoaded && !isSignedIn && (
          <p role="status">
            Sign in to load, save, and delete filter presets.
          </p>
        )}

        {presetsLoading && <p aria-live="polite">Loading presets…</p>}
        {presetsError && (
          <p role="alert" style={{ color: "crimson" }}>
            Presets: {presetsError}
          </p>
        )}

        <label htmlFor="preset-select">Saved presets: </label>
        <select
          id="preset-select"
          value={presetSelectValue}
          onChange={handlePresetSelect}
          aria-label="Select a saved filter preset"
          disabled={!isSignedIn || presetsLoading}
        >
          <option value="">-- Select a preset --</option>
          {presets.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {presets.length > 0 && (
        <ul style={{ marginTop: "0.5rem" }}>
          {presets.map((p) => (
            <li key={p.id}>
              {p.name}{" "}
              <button
                type="button"
                onClick={() => void handleDeletePreset(p.id)}
                disabled={!isSignedIn || presetsLoading}
                aria-label={`Delete preset ${p.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "0.5rem" }}>
        <label htmlFor="preset-name">Save as preset: </label>
        <input
          id="preset-name"
          type="text"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          placeholder="Preset name"
          aria-label="Preset name"
          disabled={!isSignedIn || presetsLoading}
        />
        <button
          type="button"
          onClick={() => void handleSavePreset()}
          disabled={!isSignedIn || presetsLoading}
        >
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
