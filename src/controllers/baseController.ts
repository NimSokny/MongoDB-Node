import { Response } from 'express';

class BaseController {
  protected sendSuccess<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
  ): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  protected sendError(res: Response, message: string = 'Error', statusCode: number = 500): void {
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

export default BaseController;

