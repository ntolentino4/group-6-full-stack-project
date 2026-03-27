import express, { Express } from "express";
import cors from "cors";
import corsOptions from "../config/cors";
import filterPresetRoutes from "./routes/filterPresetRoutes";

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Expense Tracker API is running!");
});

app.use("/api/filter-presets", filterPresetRoutes);

export default app;
