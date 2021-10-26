import container from '@/loaders/inversify';
import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/utils/appError';
import { contains } from 'ramda';
import { ResMessage } from '@/utils/resMessage';
import { Container, inject, injectable } from 'inversify';
import { TYPES } from '@/utils/type';
import { ClassService } from '@/services';

@injectable()
export class ClassController {
  private _classService: ClassService;
  constructor(myContainer: Container) {
    this._classService = myContainer.get(TYPES.IClassService);
  }

  @bind
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const classRes = await this._classService.findById(req.params.id);
      if (classRes) {
        return res.status(200).json(classRes);
      }
      return res.status(404).json({ message: 'Not Found' });
    } catch (err) {
      return next(err);
    }
  }
  @bind
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { code } = req.query;
      const queryOptions = code
        ? {
            code: {
              $regex: code,
              $options: 'i'
            }
          }
        : {};
      const classes = this._classService.find(queryOptions);
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
      const { code, maxStudent } = req.body;
      const result = await this._classService.create({ code, maxStudent });
      return next(new ResMessage(201, 'Create successful'));
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
      const model = await this._classService.findById(req.body.id);
      const { code, maxStudent } = req.body;
      if (model) {
        const result = await this._classService.update(model._id, {
          code,
          maxStudent
        });
        return next(new ResMessage(200, 'Update successful'));
      }
      return next(new ResMessage(404, 'Not Found'));
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
      const model = await this._classService.findById(req.params.id);
      if (model) {
        const code = model.code;
        await this._classService.delete(model._id);
        return next(new ResMessage(200, `Delete class code ${code}`));
      }
      return next(new ResMessage(404, 'Not Found'));
    } catch (error) {
      return next(error);
    }
  }
}
