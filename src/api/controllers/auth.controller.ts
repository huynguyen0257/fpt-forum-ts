import { NextFunction, Request, Response, Handler } from 'express';
import { bind } from 'decko';
import { IUserService } from '@/services';
import InversifyLoader from '@/loaders/inversify';
import { INVERSIFY } from '@/utils/inversify.type';
import { ErrorMsg } from '@/utils/appError';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import config from '@/config';
import MyPassport from '@/loaders/passport';

export default class AuthController {
  private _userService: IUserService;

  constructor() {
    this._userService = InversifyLoader.container.get(INVERSIFY.IUserService);
  }

  @bind()
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    MyPassport.passport.authenticate('local', (err, user) => {
      console.log(`err, user: ${JSON.stringify({ err, user })}`);
      // handle error
      if (err) {
        return res.status(500).json({ message: err });
      }

      // login false
      if (!user) {
        return res.status(401).json({ message: 'email & password not valid' });
      }

      // login success
      user.password = undefined;
      user.classes = undefined;
      const token = AuthController.createToken(user._id);

      return res.status(200).json({
        token,
        user
      });
    })(req, res, next);
  }

  @bind()
  public async loginByFacebook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    MyPassport.passport.authenticate('facebook', {
      scope: ['email', 'public_profile']
    })(req, res, next);
  }

  @bind()
  public async facebookCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    MyPassport.passport.authenticate('facebook', (err, user, info) => {
      console.log('******* In auth/facebook/callback *******');
      console.log(`\t-error: ${err}`);
      console.log(`\t-user: ${JSON.stringify(user)}`);
      console.log(`\t-info: ${JSON.stringify(info)}`);
      // handle error
      if (err) {
        return next(new ErrorMsg(500, 'FBCallback error', err.message, err));
      }

      // login false
      if (!user) {
        return next(
          new ErrorMsg(401, 'FBCallback null user', info.message, info)
        );
      }

      // login success
      user.password = undefined;
      user.classes = undefined;
      user.tokens = undefined;
      const token = AuthController.createToken(user._id);

      return res.status(200).json({
        token,
        user
      });
    })(req, res, next);
  }

  @bind()
  public async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { username, password, emailAddress, phoneNumber, fullName } =
        req.body;
      let user = await this._userService.findOne({ username });
      if (user) {
        return next(new ErrorMsg(401, 'Bad request', 'Username is existed!'));
      }

      user = await this._userService.create({
        username,
        password,
        emailAddress,
        phoneNumber,
        fullName
      });

      // Generate token
      const token = AuthController.createToken(user._id);

      user.password = undefined;
      return res.status(200).json({
        token,
        user
      });
    } catch (error) {
      return next(error);
    }
  }
  @bind()
  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      res.clearCookie('token');
      return res.status(200).json({ message: 'Logout' });
    } catch (error) {
      return next(error);
    }
  }
  private static createToken(id: any): string {
    return jwt.sign(
      {
        id
      },
      config.jwtPrivateKey,
      {
        algorithm: 'RS256',
        expiresIn: config.jwtExpiresIn
      }
    );
  }
}
