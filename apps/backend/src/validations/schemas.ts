import Joi from "joi";

const categories = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Shopping",
  "Health",
];

export const budgetGoalSchema = Joi.object({
  category: Joi.string()
    .valid(...categories)
    .required(),
  limit: Joi.number().positive().required().messages({
    "number.positive": "Budget limit must be greater than 0",
  }),
});

export const expenseSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    'number.positive': 'Amount must be greater than 0'
  }),
  category: Joi.string().valid(...categories).required(),
  tag: Joi.string().min(1).required(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    'string.pattern.base': 'Date must be in YYYY-MM-DD format'
  }),
  description: Joi.string().min(1).required(),
});
