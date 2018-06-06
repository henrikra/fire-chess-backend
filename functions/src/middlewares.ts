import { Request, Response, NextFunction } from "express";

const findMissingFields = (fields: object, requiredFields: string[]) => {
  const foundFields = Object.keys(fields);
  return requiredFields.filter(
    requiredField => !foundFields.includes(requiredField)
  );
};

export const validateBodyMiddleware = (requiredFields: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const missingFields = findMissingFields(req.body, requiredFields);
  if (!missingFields.length) {
    next();
  } else {
    res
      .status(400)
      .send({ error: `Missing body fields: ${missingFields.join(", ")}` });
  }
};

export const validateQueryMiddleware = (requiredFields: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const missingFields = findMissingFields(req.query, requiredFields);
  if (!missingFields.length) {
    next();
  } else {
    res
      .status(400)
      .send({ error: `Missing query params: ${missingFields.join(", ")}` });
  }
};
