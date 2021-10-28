import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { ErrorMsg } from '@/utils/appError';
import { IUserService } from '@/services';
import { TYPES } from '@/utils/type';
import InversifyLoader from '@/loaders/inversify';
import { UserVM } from '../viewmodels/user.vm';
import { plainToClass } from 'class-transformer';

export class UserController {
  private _userService: IUserService;
  constructor() {
    this._userService = InversifyLoader.container.get(TYPES.IUserService);
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
      const {
        username,
        password,
        emailAddress,
        phoneNumber,
        fullName,
        classId
      } = req.body;
      const isEmailExist = await this._userService.findOne({ emailAddress });
      if (isEmailExist)
        return next(new ErrorMsg(400, 'Email is already taken'));

      await this._userService.create({
        username,
        password,
        emailAddress,
        phoneNumber,
        fullName,
        classes: [classId]
      });
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
      const model = await this._userService.findById(req.body.id);
      const { code, maxStudent } = req.body;
      if (model) {
        const result = await this._userService.update(model._id, {
          code,
          maxStudent
        });
        return res.status(200).json({ message: 'Update successful' });
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
