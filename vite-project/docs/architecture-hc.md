# Architectural Layout: Budget Implementation

## 1. Custom Hook: `useBudgets`

**What does this hook do?** This hook manages the state of the budget goals and exposes functions (`addBudget`, `removeBudget`) to interact with that state.

**How did you decide what logic to include, and how does it separate concerns?** I included presentation logic here, specifically the React `useState` and `useEffect` hooks, to synchronize the UI with our data. It handles alerts for user feedback but defers all data validation to the service layer, keeping presentation separate from business rules.

**Where is this implementation used and how?** It is invoked in `src/pages/CategoryTotalsPage.tsx` to provide the current list of budgets to the component and to trigger add/remove actions when the user submits the budget form or clicks a remove button.

---

## 2. Service: `budgetService`

**What does this service do?** This service acts as the intermediary between the presentation layer and the data layer, defining the core rules for how budgets can be created.

**How did you decide what logic to include, and how does it separate concerns?** I placed pure business logic here. For example, the `addBudget` method checks if a budget limit is `<= 0` and verifies that a budget for the selected category doesn't already exist. This prevents the UI or the repository from having to care about real-world domain rules.

**Where is this implementation used and how?** It is used exclusively inside the `useBudgets` hook (`src/hooks/useBudgets.ts`) to validate data before sending it down to the repository.

---

## 3. Repository: `budgetRepository`

**What does this repository do?** This repository simulates a database connection by performing CRUD operations (Create, Read, Delete) on an external resource (our mock data array.

**How did you decide what logic to include, and how does it separate concerns?** I isolated all data-access logic into this file. It includes `setTimeout` simulated promises to mimic network requests. It knows nothing about React state or business validation rules; it solely focuses on fetching and updating data.

**Where is this implementation used and how?** It is used by `src/services/budgetService.ts`. The service calls repository methods like `getAll()` or `add()` to persist the validated changes.
