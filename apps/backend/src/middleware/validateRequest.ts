import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Validate the request body against the Joi schema
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Send a 400 status with a clean list of specific validation errors
      res.status(400).json({
        message: "Validation failed",
        errors: error.details.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
      return;
    }

    req.body = value;

    next();
  };
};