import { Router } from "express";
import ClassController from "../controllers/class.controller";
import { body, param } from "express-validator";
import {ValidateRequest} from "../middlewares";

export default class ClassRoute {
  private readonly _route: Router;
  private readonly _controller: ClassController;
  private readonly _middlewawres: ValidateRequest;
  constructor() {
    this._route = Router();
    this._controller = new ClassController();
    this._middlewawres = new ValidateRequest();
    this.init();
  }

  public get route(): Router {
    return this._route;
  }

  /**
   * init all route to ClassController
   * Middleware as well
   */
  private init(): void {
    //   this._router.use(middlewares.isAuth);
    this._route.get("/", this._controller.getAll);
    this._route.post(
      "/",
      body("code").isString(),
      body("maxStudent").isNumeric(),
      this._middlewawres.validateRequest,
      this._controller.create
    );
  }
}
