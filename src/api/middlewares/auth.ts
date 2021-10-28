import config from '@/config';
import InversifyLoader from '@/loaders/inversify';
import { IUserService } from '@/services';
import { ErrorMsg } from '@/utils/appError';
import { INVERSIFY } from '@/utils/inversify.type';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class AuthMiddleware {
  static userService: IUserService = InversifyLoader.container.get(
    INVERSIFY.IUserService
  );

  public static async isAuth(req: Request, res: Response, next: NextFunction) {
    let token;
    let decode;
    if (
      // Check exist authorization token before use startsWith api
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return next(new ErrorMsg(400, 'Missing Bearer token'));
    }

    if (!token) {
      return next(
        new ErrorMsg(401, 'You are not logged in! Please login in to continue')
      );
    }

    // 2) Verify token
    try {
      decode = (await jwt.verify(token, config.jwtSecret)) as JwtPayload;
    } catch (error) {
      return next(new ErrorMsg(401, 'Invalid Bearer token.'));
    }

    // 3) check if the user is exist (not deleted)
    try {
      const user = await AuthMiddleware.userService.findById(decode.id);
      if (!user)
        return next(new ErrorMsg(401, 'This user is no longer exist.'));
      req.currentUser = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
}
