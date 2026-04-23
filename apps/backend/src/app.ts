import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'; // Official Clerk middleware
import expenseRoutes from './routes/expenseRoutes';
import budgetRoutes from './routes/budgetRoutes';
import filterPresetRoutes from './routes/filterPresetRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Essential: This middleware populates req.auth for all downstream routes
app.use(clerkMiddleware()); 

app.use('/api/expenses', expenseRoutes);
app.use('/api/my-budgets', budgetRoutes);
app.use('/api/presets', filterPresetRoutes);

export default app;