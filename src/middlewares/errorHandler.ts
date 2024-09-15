import { json, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    res.status(400);
    const formattedErrors = err.errors.map((e) => ({
      path: e.path[0],
      message: e.message,
    }));

    return res.json({ errors: formattedErrors });
  }

  if (err.message) {
    res.status(400).json({ error: err.message });
  }

  next(err);
}
