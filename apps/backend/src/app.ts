import express, { Express } from "express";
import cors from "cors";
import corsOptions from "../config/cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import filterPresetRoutes from "./routes/filterPresetRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import expenseRoutes from "./routes/expenseRoutes";

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());

// 2. GLOBAL PARSER
// This decodes the token if it exists, but doesn't block anyone yet.
app.use(clerkMiddleware());

// 3. PUBLIC ROUTE (Unprotected)
app.get("/", (_req, res) => {
  res.send("Expense Tracker API is running!");
});

// 4. PROTECTED ROUTES (Requires Login)
// requireAuth() automatically blocks guests and sends a clean 401 error.
app.use("/api/budgets", requireAuth(), budgetRoutes);
app.use("/api/expenses", requireAuth(), expenseRoutes);
app.use("/api/filter-presets", requireAuth(), filterPresetRoutes);

export default app;
