import { Router } from 'express';
import { ClassController } from '../controllers';
import { body, param } from 'express-validator';
import IRoute from './i.route';
import { AuthMiddleware, ValidateRequest } from '../middlewares';
import { ROLES } from '@/utils/role.type';

export default class ClassRoute implements IRoute<ClassController> {
  public readonly route: Router;
  public readonly controller: ClassController;
  constructor() {
    this.route = Router();
    this.controller = new ClassController();
    this.setupGlobalMiddleware();
    this.init();
  }

  /**
   * init all route to ClassController
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
      AuthMiddleware.isPermission([ROLES.MANAGER, ROLES.PROFESSOR]),
      body('code')
        .isString()
        .withMessage('code is a string')
        .isUppercase()
        .withMessage('Please upper case'),
      body('maxStudent').isNumeric(),
      ValidateRequest.validateRequest,
      this.controller.create
    );
    this.route.put(
      '/',
      AuthMiddleware.isPermission([ROLES.MANAGER, ROLES.PROFESSOR]),
      body('id').isString(),
      body('code')
        .isString()
        .withMessage('code is a string')
        .isUppercase()
        .withMessage('Please upper case'),
      body('maxStudent').isNumeric(),
      ValidateRequest.validateRequest,
      this.controller.update
    );
    this.route.delete(
      '/:id',
      AuthMiddleware.isPermission([ROLES.MANAGER, ROLES.PROFESSOR]),
      param('id').isString(),
      ValidateRequest.validateRequest,
      this.controller.remove
    );
  }

  /**
   * Setup Middleware for all Class Controller
   */
  public setupGlobalMiddleware(): void {
    this.route.use(AuthMiddleware.isAuth);
  }
}
