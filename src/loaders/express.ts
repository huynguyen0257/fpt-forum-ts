import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import camelcaseKeys from 'camelcase-keys';
import logger from './logger';
import config from '../config';
import { ErrorMsg } from '@/utils/appError';
import MyRoute from '@/api/routes';
import { Container } from 'inversify';

export default class ExpressLoader {
  private readonly _app: Application;
  constructor(app: Application) {
    this._app = app;
    this.setupViewEngine();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupHandleUndefinedRoutes();
  }

  private async setupViewEngine() {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use(cookieParser());
  }
  private async setupMiddleware() {
    this._app.use((req, res, next) => {
      req.body = camelcaseKeys(req.body, { deep: true });
      req.params = camelcaseKeys(req.params);
      req.query = camelcaseKeys(req.query);
      next();
    });

    this._app.use((req, res, next) => {
      logger.info(`${req.method} ${req.originalUrl}`);
      next();
    });
  }
  private async setupRoutes() {
    this._app.use(config.api.prefix, new MyRoute().route);
  }
  private async setupHandleUndefinedRoutes() {
    this._app.use('*', (req, res, next) => {
      //   const err = new AppError(404, "fail", "undefined route");
      const err = new ErrorMsg(404, 'Undefined route');
      next(err);
    });

    // error handlers
    this._app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
          return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
      }
    );
    this._app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        err.status = err.status || 500;
        if (err.status === 500) {
          logger.error(err);
          logger.error(err.stack);
        }
        res
          .status(err.status)
          .json({
            error: err.message || err
          })
          .end();
      }
    );
  }

  public get app(): Application {
    return this._app;
  }
}
