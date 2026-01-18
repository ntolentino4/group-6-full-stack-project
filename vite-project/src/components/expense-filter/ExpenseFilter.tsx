import { mockExpenses } from '../../data/mockExpenses'
import './ExpenseFilter.css'

function ExpenseFilter() {
  const foodExpenses = mockExpenses.filter(
    expense => expense.category === "Food"
  )

  return (
    <section className="expense-filter">
      <ul>
        {foodExpenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - $ {expense.amount} ({expense.date})
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExpenseFilter