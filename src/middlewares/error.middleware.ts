import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);

  const statusCode = 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
}

