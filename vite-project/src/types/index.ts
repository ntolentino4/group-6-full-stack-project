export type ExpenseCategory = 
  | "Food" 
  | "Transport" 
  | "Housing" 
  | "Entertainment" 
  | "Shopping" 
  | "Health"

export interface Expense {
  id: number
  amount: number
  category: ExpenseCategory
  tag: string
  date: string
  description: string
}
