import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { INVERSIFY } from '@/utils/inversify.type';
import { RoleService } from '@/services';
import InversifyLoader from '@/loaders/inversify';

export class RoleController {
  private _classService: RoleService;
  constructor() {
    this._classService = InversifyLoader.container.get(INVERSIFY.IRoleService);
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
      const { roleName } = req.body;
      await this._classService.create({ roleName });
      return res.status(201).json({ message: 'Create successful' });
    } catch (error) {
      return next(error);
    }
  }
}
