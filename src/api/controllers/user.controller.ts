import { bind } from 'decko';
import UserService from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import { AppError } from '@/utils/appError';

export default class UserController {
  private _userService = new UserService();

  @bind // use to pass {this} to function
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = this._userService.getAll();
      return res.status(200).json(await users);
    } catch (err) {
      return next(err);
    }
  }

  @bind
  public async create(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
			const { username, password, emailAddress, phoneNumber, fullName, classId } = req.body;
      const isEmailExist = await this._userService.getOne({emailAddress});
      if (isEmailExist)
       return next(new AppError(400, "Email is already taken"));

      const user = await this._userService.create({ username, password, emailAddress, phoneNumber, fullName, classes: [classId] });
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
}
