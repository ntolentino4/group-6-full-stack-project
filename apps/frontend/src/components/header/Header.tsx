import { NavLink } from "react-router-dom";
// Import Clerk components
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <h1>Personal Expense Tracker</h1>
      <nav className="main-nav">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>

        {/* Wrap protected links in <SignedIn> so they only show to logged-in users*/}
        <SignedIn>
          <NavLink to="/recent-expenses" className="nav-link">
            Recent Expenses
          </NavLink>
          <NavLink to="/expense-filter" className="nav-link">
            Expense Filter
          </NavLink>
          <NavLink to="/category-totals" className="nav-link">
            Category Totals
          </NavLink>
        </SignedIn>

        {/* User Management Section */}
        <div className="auth-controls">
          <SignedOut>
            {/* Renders an obvious login button for guests  */}
            <SignInButton mode="modal">
              <button className="login-btn">Login</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Renders an obvious profile/logout button for users*/}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
