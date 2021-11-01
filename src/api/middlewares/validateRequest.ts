import { ErrorMsg } from '@/utils/appError';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export class ValidateRequest {
  public static validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ErrorMsg(400, 'ValidateRequest', null, errors.array()));
    }

    return next();
  }
}
