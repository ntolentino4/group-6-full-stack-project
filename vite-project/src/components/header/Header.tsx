import { NavLink } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    // AC 1: A <nav> component is found in the app header
    <header className="app-header">
      <h1>Personal Expense Tracker</h1>
      <nav className="main-nav">
        {/*AC2:  The <nav> has links to at least each Feature Page. */}

        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/recent-expenses" className="nav-link">
          Recent Expenses
        </NavLink>
        <NavLink to="/expense-filter" className="nav-link">
          Expense Filter
        </NavLink>
        <NavLink to="/category-totals" className="nav-link">
          Category Totals
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
