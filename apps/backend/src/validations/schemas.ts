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
