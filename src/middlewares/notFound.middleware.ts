import { NextFunction, Request, Response } from 'express';

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next();

  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
}

