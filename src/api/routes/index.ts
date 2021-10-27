import UserRoute from './user.route';
import ClassRoute from './class.route';
import { Router } from 'express';
import { Container } from 'inversify';
import AuthRoute from './auth.route';

export default class MyRoute {
  private readonly _route: Router;
  constructor() {
    this._route = Router();
    this._route.use('/auth', new AuthRoute().route);
    this._route.use('/class', new ClassRoute().route);
    this._route.use('/user', new UserRoute().route);
  }

  public get route(): Router {
    return this._route;
  }
}
