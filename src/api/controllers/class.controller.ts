import { Container } from 'typedi';
import { bind } from 'decko';
import ClassService from "@/services/class.service";
import { NextFunction, Request, Response } from "express";
import { AppError } from '@/utils/appError';

export default class ClassController {
  private _classService: ClassService = Container.get(ClassService);

  @bind 
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const classes = this._classService.getAll();
      return res.status(200).json(await classes);
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

      return res.status(201).json();
    } catch (error) {
      return next(error);
    }
  }
}
