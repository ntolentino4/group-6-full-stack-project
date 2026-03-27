import express, { Express } from "express";
import cors from "cors";
import corsOptions from "../config/cors";
import budgetRoutes from "./routes/budgetRoutes";

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/budgets", budgetRoutes);

app.get("/", (_req, res) => {
  res.send("Expense Tracker API is running!");
});

export default app;
