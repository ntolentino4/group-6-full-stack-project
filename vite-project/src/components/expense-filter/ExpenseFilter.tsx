import { mockExpenses } from '../../data/mockExpenses'
import './ExpenseFilter.css'
import { useState } from 'react'

function ExpenseFilter() {

  // Default category state "Shopping"
  const [selectedCategory, setSelectedCategory] = useState("Shopping")

// Filter the expenses by the selected expense.category, default "Shopping"". 
  const filteredExpenses = mockExpenses.filter(
    expense => expense.category === selectedCategory
  )

// Create a select dropdown to setSelectedCategory, then use map to display the filtered expenses.
  return (
    <section className="expense-filter">
       <label htmlFor="category-select">Select Category: </label>
       <select id="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
    </section>
  )
}

// Export to App.tsx
export default ExpenseFilter



