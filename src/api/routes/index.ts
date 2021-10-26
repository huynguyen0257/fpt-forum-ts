import UserRoute from './user.route';
import ClassRoute from './class.route';
import { Router } from 'express';
import { Container } from 'inversify';

export default class MyRoute {
  private readonly _route: Router;
  constructor(myContainer: Container) {
    this._route = Router();
    // app.use("/auth", authRoute());
    this._route.use('/class', new ClassRoute(myContainer).route);
    // this._route.use('/user', new UserRoute(myContainer).route);
  }

  public get route(): Router {
    return this._route;
  }
}
