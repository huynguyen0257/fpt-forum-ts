import { Router } from 'express';
import { Container } from 'inversify';
import { UserController } from '../controllers';
import IRoute from './i.route';
import MyMiddlewares from '../middlewares';
import { body, param } from 'express-validator';

export default class UserRoute implements IRoute<UserController> {
  private readonly _route: Router;
  private readonly _controller: UserController;
  private readonly _middleWares: MyMiddlewares;
  constructor(myContainer: Container) {
    this._route = Router();
    this._controller = new UserController(myContainer);
    this._middleWares = new MyMiddlewares();
    this.init();
  }

  public get route(): Router {
    return this._route;
  }

  /**
   * init all route to UserController
   * Middleware as well
   */
  public init(): void {
    //   this._router.use(middlewares.isAuth);
    this._route.get('/', this._controller.getAll);
    this._route.get(
      '/:id',
      param('id').isString(),
      this._middleWares.ValidateRequest.validateRequest,
      this._controller.getById
    );
    this._route.post(
      '/',
      body('username').isString().withMessage('code is required'),
      body('password').isString().withMessage('password is required'),
      body('fullName').isString().withMessage('fullName is required'),
      body('phoneNumber')
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
        .withMessage('phoneNumber is required'),
      body('emailAddress').isEmail().withMessage('invalid email address'),
      this._middleWares.ValidateRequest.validateRequest,
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
      this._middleWares.ValidateRequest.validateRequest,
      this._controller.update
    );
    this._route.delete(
      '/:id',
      param('id').isString(),
      this._middleWares.ValidateRequest.validateRequest,
      this._controller.remove
    );
  }

  setupGlobalMiddleware(): void {
    throw new Error('Method not implemented.');
  }
}
