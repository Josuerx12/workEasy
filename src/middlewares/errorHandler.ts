import { json, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.reduce((acc, e) => {
      acc[e.path[0]] = e.message;
      return acc;
    }, {} as Record<string, string>);

    return res.status(400).json({ errors: formattedErrors });
  }

  if (err.message) {
    res.status(400).json({ error: err.message });
  }

  next(err);
}
