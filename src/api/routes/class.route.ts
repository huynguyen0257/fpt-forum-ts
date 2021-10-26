import { Router } from 'express';
import { ClassController } from '../controllers/class.controller';
import { body, param } from 'express-validator';
import * as middlewares from '../middlewares';
import IRoute from './i.route';
import { Container } from 'inversify';

export default class ClassRoute implements IRoute<ClassController> {
  private readonly _route: Router;
  private readonly _controller: ClassController;
  private readonly _middleWares: middlewares.ValidateRequest;
  constructor(myContainer: Container) {
    this._route = Router();
    this._controller = new ClassController(myContainer);
    this._middleWares = new middlewares.ValidateRequest();
    this.init();
  }

  public get route(): Router {
    return this._route;
  }

  /**
   * init all route to ClassController
   * Middleware as well
   */
  public init(): void {
    this.setupGlobalMiddleware();
    this._route.get('/', this._controller.getAll);
    this._route.get(
      '/:id',
      param('id').isString(),
      this._middleWares.validateRequest,
      this._controller.getById
    );
    this._route.post(
      '/',
      body('code')
        .isString()
        .withMessage('code is a string')
        .isUppercase()
        .withMessage('Please upper case'),
      body('maxStudent').isNumeric(),
      this._middleWares.validateRequest,
      this._controller.create
    );
    this._route.put(
      '/',
      body('id').isString(),
      body('code')
        .isString()
        .withMessage('code is a string')
        .isUppercase()
        .withMessage('Please upper case'),
      body('maxStudent').isNumeric(),
      this._middleWares.validateRequest,
      this._controller.update
    );
    this._route.delete(
      '/:id',
      param('id').isString(),
      this._middleWares.validateRequest,
      this._controller.remove
    );
  }

  /**
   * Setup Middleware for all Class Controller
   */
  public setupGlobalMiddleware(): void {
    //   this._router.use(middlewares.isAuth);
  }
}
