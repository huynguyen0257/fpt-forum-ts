import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import IRoute from './i.route';

export default class AuthRoute implements IRoute<AuthController> {
  public readonly route: Router;
  public readonly controller: AuthController;

  constructor() {
    this.route = Router();
    this.controller = new AuthController();
    this.init();
  }

  init(): void {
    this.route.post('/login', this.controller.login);
    this.route.post('/logout', this.controller.logout);
    this.route.post('/signup', this.controller.signup);
  }
  setupGlobalMiddleware(): void {
    throw new Error('Method not implemented.');
  }
}
