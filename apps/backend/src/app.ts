import express, { Express } from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Expense Tracker API is running!");
});

export default app;