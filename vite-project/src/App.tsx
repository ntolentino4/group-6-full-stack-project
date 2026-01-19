import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { CategorySummary } from "./components/category-summary/CategorySummary";

function App() {
  return (
    <div className="app-container">
      <main>
        <Header />
        <CategorySummary />
        <Footer />
      </main>
    </div>
  );
}

export default App;
