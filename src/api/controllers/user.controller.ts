import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { ErrorMsg } from '@/utils/appError';
import { IUserService } from '@/services';
import { INVERSIFY } from '@/utils/inversify.type';
import InversifyLoader from '@/loaders/inversify';
import { UserCM, UserUM, UserVM } from '../viewmodels/user.vm';
import { plainToClass } from 'class-transformer';

export class UserController {
  private _userService: IUserService;
  constructor() {
    this._userService = InversifyLoader.container.get(INVERSIFY.IUserService);
  }

  @bind
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const classRes = await this._userService.findById(req.params.id);
      if (classRes) {
        return res.status(200).json(classRes);
      }
      return res.status(404).json({ message: 'Not Found' });
    } catch (err) {
      return next(err);
    }
  }

  @bind // use to pass {this} to function
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = (await this._userService.find()).map((user) => {
        const vm = plainToClass(UserVM, user.toObject(), {
          excludeExtraneousValues: true
        });
        vm.created = `${user.created.toLocaleTimeString()} ${user.created.toLocaleDateString()}`;
        vm.id = user._id;
        return vm;
      });
      return res.status(200).json(await users);
    } catch (err) {
      return next(err);
    }
  }

  @bind
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const cm = plainToClass(UserCM, req.body, {
        excludeExtraneousValues: true
      });
      const isEmailExist = await this._userService.findOne({
        emailAddress: cm.emailAddress
      });
      if (isEmailExist)
        return next(new ErrorMsg(400, 'Email is already taken'));

      await this._userService.create({ ...cm, classes: [cm.classId] });
      return res.status(201).json({ message: 'Create successful' });
    } catch (error) {
      return next(error);
    }
  }

  @bind
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const um = plainToClass(UserUM, req.body, {
        excludeExtraneousValues: true
      });
      const model = await this._userService.findById(um.id);
      if (model) {
        await this._userService.update(model._id, um);
        return res.status(200).json({ message: 'Update successful' });
      }
      return next(new ErrorMsg(404, 'Not Found'));
    } catch (error) {
      return next(error);
    }
  }

  @bind
  public async addRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const model = await this._userService.findById(req.body.id);
      if (model) {
        if (await this._userService.addRole(model, req.body.roleIds)) {
          return res.status(200).json({ message: 'Update role success' });
        }
        return res.status(400).json({ message: 'Update role fail' });
      }
      return next(new ErrorMsg(404, 'Not Found'));
    } catch (error) {
      return next(error);
    }
  }

  @bind
  public async remove(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const model = await this._userService.findById(req.params.id);
      if (model) {
        const username = model.username;
        await this._userService.delete(model._id);
        return res
          .status(200)
          .json({ message: `Delete username: ${username}` });
      }
      return next(new ErrorMsg(404, 'Not Found'));
    } catch (error) {
      return next(error);
    }
  }
}
