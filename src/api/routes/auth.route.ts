import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import IRoute from './i.route';
import { body, param } from 'express-validator';
import { ValidateRequest } from '../middlewares';

export default class AuthRoute implements IRoute<AuthController> {
  public readonly route: Router;
  public readonly controller: AuthController;

  constructor() {
    this.route = Router();
    this.controller = new AuthController();
    this.setupGlobalMiddleware();
    this.init();
  }

  init(): void {
    this.route.get('/facebook', this.controller.loginByFacebook);
    this.route.get('/facebook/callback', this.controller.facebookCallback);
    this.route.post(
      '/login',
      body('email').isString().withMessage('email is required'),
      body('password').isString().withMessage('password is required'),
      ValidateRequest.validateRequest,
      this.controller.login
    );
    this.route.post('/logout', this.controller.logout);
    this.route.post(
      '/signup',
      body('username').isString().withMessage('username is required'),
      body('password').isString().withMessage('password is required'),
      body('fullName').isString().withMessage('fullName is required'),
      body('phoneNumber')
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
        .withMessage('phoneNumber is required'),
      body('emailAddress').isEmail().withMessage('invalid email address'),
      ValidateRequest.validateRequest,
      this.controller.signup
    );
  }
  /* tslint:disable:no-empty */
  setupGlobalMiddleware(): void {}
}
