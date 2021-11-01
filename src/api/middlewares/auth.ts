import config from '@/config';
import InversifyLoader from '@/loaders/inversify';
import { IUserService } from '@/services';
import { ErrorMsg } from '@/utils/appError';
import { INVERSIFY } from '@/utils/inversify.type';
import { Request, Response, NextFunction, Handler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role, RoleDoc } from '@/models';
import MyPassport from '@/loaders/passport';

export class AuthMiddleware {
  static userService: IUserService = InversifyLoader.container.get(
    INVERSIFY.IUserService
  );

  public static async isAuth(req: Request, res: Response, next: NextFunction) {
    MyPassport.passport.authenticate('jwt', async function (err, user, info) {
      if (err) {
        return next(new ErrorMsg(400, 'Bad Request', err));
      }
      if (!user) {
        return next(new ErrorMsg(401, info.name, info.message));
      } else {
        req.currentUser = user;
        next();
      }
    })(req, res, next);
  }

  public static isPermission(roleNames: symbol[]): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const rNames = roleNames.map((r) => r.description);
      for (const role of req.currentUser.roles as RoleDoc[]) {
        if (rNames.indexOf(role.roleName) > -1) {
          return next();
        }
      }
      next(new ErrorMsg(401, 'Do not have permission'));
    };
  }
}
