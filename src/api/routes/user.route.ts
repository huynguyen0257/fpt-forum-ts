import { Router } from "express";
import UserController from "../controllers/user.controller";

export default class UserRoute {
  private readonly _route: Router;
  private readonly _controller: UserController;
  constructor() {
    this._route = Router();
    this._controller = new UserController();
    this.init();
  }

  public get route(): Router {
    return this._route;
  }

  /**
   * init all route to UserController
   * Middleware as well
   */
  private init(): void {
    //   this._router.use(middlewares.isAuth);
    this._route.get('/',this._controller.getAll);
    this._route.post('/',this._controller.create);
  }
}
