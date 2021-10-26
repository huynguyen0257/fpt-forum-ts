import { AppError } from '@/utils/appError';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export class ValidateRequest {
  public validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new AppError(400, errors.array()));
    }

    return next();
  }
}
