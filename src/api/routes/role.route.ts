import { Router } from 'express';
import { RoleController } from '../controllers';
import { body, param } from 'express-validator';
import IRoute from './i.route';
import { AuthMiddleware, ValidateRequest } from '../middlewares';
import { ROLES } from '@/utils/role.type';

export default class RoleRoute implements IRoute<RoleController> {
  public readonly route: Router;
  public readonly controller: RoleController;
  constructor() {
    this.route = Router();
    this.controller = new RoleController();
    this.setupGlobalMiddleware();
    this.init();
  }

  /**
   * init all route to RoleController
   * Middleware as well
   */
  public init(): void {
    this.setupGlobalMiddleware();
    this.route.get('/', this.controller.getAll);
    this.route.get(
      '/:id',
      param('id').isString(),
      ValidateRequest.validateRequest,
      this.controller.getById
    );
    this.route.post(
      '/',
      body('roleName')
        .isString()
        .withMessage('roleName is a string')
        .isUppercase()
        .withMessage('Please upper case'),
      ValidateRequest.validateRequest,
      this.controller.create
    );
  }

  /**
   * Setup Middleware for all Role Controller
   */
  public setupGlobalMiddleware(): void {
    this.route.use(AuthMiddleware.isAuth);
    this.route.use(AuthMiddleware.isPermission([ROLES.MANAGER]));
  }
}
