import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h1>Personal Expense Tracker</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/recent-expenses">Recent Expenses</Link>
        <Link to="/expense-filter">Expense Filter</Link>
        <Link to="/category-totals">Category Totals</Link>
      </nav>
    </header>
  );
}

export default Header;
