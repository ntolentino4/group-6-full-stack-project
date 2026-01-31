# Personal Expense Tracker App

## Project Team Information

**Team Name:** Group 6

**Team Members:**
- Ashley Rohleder
- Helen Castillo
- Neil Tolentino

## Project General Description

A React-based expense tracking application that allows users to view recent expenses, add new ones and filter them by category.

## Three High-Level User Stories

**Story 1: Recent Expense List Component**

"As a user, I want to add new expense in the list of my recent expense so that I can track my spending".

**Story 2: Expense Category Summary Component**

"As a user, I want to record my total expense by category so that I can easily identify my highest spending".

**Story 3: Expense Filter Component**

"As a user, I want to filter my expenses by one or more categories so that I can easily view and analyze my spending habits". (sprint 2)

## Front-End Deployment

**Live Application:** [To be added]

### Local Development

- cd vite-project
- npm install
- npm run dev

## Shared Components

The project includes reusable components in `/components/shared/`:

- **NavButton**: Reusable navigation button component (used in Header)
  - Props: `to` (string), `children` (ReactNode), `className?` (optional)
  
- **ListPanel**: Reusable panel container for list-based components
  - Props: `title` (string), `children` (ReactNode), `headerContent?` (optional), `footerContent?` (optional)
  - Available for use by: RecentExpenses, CategorySummary, ExpenseFilter

## Sprint 1 Kanban Items

### Done (Completed)

| Kanban Item | Assigned To |
|------------|-------------|
| T.1: Set up Project Git Repository | Neil Tolentino |
| Set up: Project Kanban Board | Ashley Rohleder |
| T.2: Project Initialization | Helen Castillo |
| Planning: Sprint 1 Components | Ashley Rohleder |
| I.1: Expense Filter Component | Ashley Rohleder |
| T.1: Install and Configure React Router | Ashley Rohleder |
| I.1: Category Summary Component | Helen Castillo |
| T.5: App Stylesheet and Style Guide | Helen Castillo |
| T.4: Integration | Ashley Rohleder |
| T.3: Project Readme | Neil Tolentino |
| T.6: Team Vercel Account/Management | Neil Tolentino |
| I.1: Recent Expenses List Component | Neil Tolentino |


## Sprint 2 Kanban Items

### Done (Completed)

| Kanban Item | Assigned To |
|------------|-------------|
| T.1: Install and Configure React Router | Ashley Rohleder |

### In Review

| Kanban Item | Assigned To |
|------------|-------------|
| T.4: Create Reusable Components with Props | Ashley Rohleder |

### In Progress

| Kanban Item | Assigned To |
|------------|-------------|
| I.1 - I.3: Create Expense Filter Feature Page | Ashley Rohleder |

### Backlog

| Kanban Item | Assigned To |
|------------|-------------|
| T.3: Implement Shared State Management | Neil Tolentino |
| T.2: Create Navigation Component in Layout | Helen Castillo |
| I.1 - I.3: Create Recent Expenses Feature Page | Neil Tolentino |
| I.1 - I.3: Create Category Summary Feature Page | Helen Castillo |