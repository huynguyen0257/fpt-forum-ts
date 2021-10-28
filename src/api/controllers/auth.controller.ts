import { NextFunction, Request, Response } from 'express';
import { bind } from 'decko';
import { IUserService } from '@/services';
import InversifyLoader from '@/loaders/inversify';
import { TYPES } from '@/utils/type';
import { ErrorMsg } from '@/utils/appError';
import { SuccessMsg } from '@/utils/resMessage';
import jwt from 'jsonwebtoken';
import config from '@/config';

export default class AuthController {
  private _userService: IUserService;

  constructor() {
    this._userService = InversifyLoader.container.get(TYPES.IUserService);
  }

  @bind()
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { username, password } = req.body;
      const user = await this._userService.findOne({ username });
      if (!user || !(await this._userService.checkPassword(password, user))) {
        return next(new ErrorMsg(401, 'Username or Password is wrong'));
      }

      // Generate token
      const token = this.createToken(user._id);

      user.password = undefined;
      user.classes = undefined;
      return res.status(200).json({
        token,
        user
      });
    } catch (error) {
      return next(error);
    }
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
        return next(new ErrorMsg(401, 'Username is existed!'));
      }

      user = await this._userService.create({
        username,
        password,
        emailAddress,
        phoneNumber,
        fullName
      });

      // Generate token
      const token = this.createToken(user._id);

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
  private createToken(id: any) {
    return jwt.sign(
      {
        id
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn
      }
    );
  }
}
