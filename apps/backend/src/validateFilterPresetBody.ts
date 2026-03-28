import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const filterPresetBodySchema = Joi.object({
  name: Joi.string().trim().required(),
  selectedCategories: Joi.array().items(Joi.string()).required(),
});

export function validateFilterPresetBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error, value } = filterPresetBodySchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Invalid request body",
      details: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  return next();
}
