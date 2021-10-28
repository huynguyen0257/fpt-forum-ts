import { Router } from 'express';
import { UserController } from '../controllers';
import IRoute from './i.route';
import { ValidateRequest } from '../middlewares';
import { body, param } from 'express-validator';
import AuthMiddleware from '../middlewares/auth';

export default class UserRoute implements IRoute<UserController> {
  public readonly route: Router;
  public readonly controller: UserController;
  constructor() {
    this.route = Router();
    this.controller = new UserController();
    this.setupGlobalMiddleware();
    this.init();
  }

  /**
   * init all route to UserController
   * Middleware as well
   */
  public init(): void {
    this.route.get('/', this.controller.getAll);
    this.route.get(
      '/:id',
      param('id').isString(),
      ValidateRequest.validateRequest,
      this.controller.getById
    );
    this.route.post(
      '/',
      body('username').isString().withMessage('username is required'),
      body('password').isString().withMessage('password is required'),
      body('fullName').isString().withMessage('fullName is required'),
      body('phoneNumber')
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
        .withMessage('phoneNumber is required'),
      body('emailAddress').isEmail().withMessage('invalid email address'),
      ValidateRequest.validateRequest,
      this.controller.create
    );
    this.route.put(
      '/',
      body('id').isString().withMessage('id is required'),
      body('fullName').isString().withMessage('fullName is required'),
      body('phoneNumber')
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
        .withMessage('phoneNumber is required'),
      body('emailAddress').isEmail().withMessage('invalid email address'),
      ValidateRequest.validateRequest,
      this.controller.update
    );
    this.route.put(
      '/role',
      body('id').isString().withMessage('id is required'),
      body('roleIds').notEmpty().withMessage('roleIds is required'),
      ValidateRequest.validateRequest,
      this.controller.addRole
    );
    this.route.delete(
      '/:id',
      param('id').isString(),
      ValidateRequest.validateRequest,
      this.controller.remove
    );
  }

  setupGlobalMiddleware(): void {
    this.route.use(AuthMiddleware.isAuth);
  }
}
