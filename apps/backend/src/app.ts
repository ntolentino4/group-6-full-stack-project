import express, { Express } from "express";
import cors from "cors";
import corsOptions from "../config/cors";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import filterPresetRoutes from "./routes/filterPresetRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import expenseRoutes from "./routes/expenseRoutes";

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());

// 1. PUBLIC ROUTE (Unprotected)
// Guests can access this without a session token.
app.get("/", (_req, res) => {
  res.send("Expense Tracker API is running!");
});

// 2. PROTECTED ROUTES (Requires Login)
// The "as any" bypasses the strict TypeScript mismatch while keeping the protection active.
app.use("/api/budgets", ClerkExpressRequireAuth() as any, budgetRoutes);
app.use("/api/expenses", ClerkExpressRequireAuth() as any, expenseRoutes);
app.use(
  "/api/filter-presets",
  ClerkExpressRequireAuth() as any,
  filterPresetRoutes,
);

// 3. CLERK ERROR HANDLER
// Catches unauthorized requests and sends a clean JSON response instead of crashing.
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err.message === "Unauthenticated") {
      return res
        .status(401)
        .json({ error: "You must be logged in to access this." });
    }
    next(err);
  },
);

export default app;
