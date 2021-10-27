import { Router } from 'express';
import { ClassController } from '../controllers/class.controller';
import { body, param } from 'express-validator';
import * as middlewares from '../middlewares';
import IRoute from './i.route';
import { Container } from 'inversify';
import { ValidateRequest } from '../middlewares';

export default class ClassRoute implements IRoute<ClassController> {
  public readonly route: Router;
  public readonly controller: ClassController;
  constructor() {
    this.route = Router();
    this.controller = new ClassController();
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
      param('id').isString(),
      ValidateRequest.validateRequest,
      this.controller.remove
    );
  }

  /**
   * Setup Middleware for all Class Controller
   */
  public setupGlobalMiddleware(): void {
    //   this.router.use(middlewares.isAuth);
  }
}
