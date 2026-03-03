# Architectural Layout: Expense Tracking Feature

## 1. `useExpenses` (Custom Hook)
* **What does it do?** It manages the React state (`expenses` array) and coordinates UI actions by exposing the `addExpense` and `removeExpense` functions to the frontend components.
* **Separation of Concerns:** I decided to keep all React-specific logic (like `useState` and `useEffect`) isolated in this hook. This ensures the UI components remain clean, declarative, and entirely free of API or data-fetching logic.
* **Where is it used?** It is invoked in `src/pages/RecentExpensesPage.tsx` to provide the data and mutator functions to the `AddExpenseForm` and `RecentExpenses` child components.

## 2. `expenseService` (Service Layer)
* **What does it do?** It acts as the business logic gatekeeper. It validates incoming expense data (e.g., ensuring descriptions are not blank and amounts are positive) before passing the data down to the repository.
* **Separation of Concerns:** I chose to put the validation logic here so that neither the React UI (the hook) nor the mock database (the repository) has to worry about business rules. It strictly enforces application constraints.
* **Where is it used?** It is imported and utilized exclusively by the `useExpenses` hook.

## 3. `expenseRepo` (Repository Layer)
* **What does it do?** It provides basic CRUD operations (`getAllExpenses`, `addExpense`, `deleteExpense`) to interact with the external data layer, which is currently mocked via the `mockExpenses.ts` file.
* **Separation of Concerns:** I included strictly data-access logic here. It doesn't know anything about React state or business validation; it only knows how to mutate and read the array of data. This isolates the data layer, making it easy to swap the mock data for a real backend database in the next sprint.
* **Where is it used?** It is imported and utilized exclusively by `src/services/expenseService.ts`.