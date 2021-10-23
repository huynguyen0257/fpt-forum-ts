import express from "express";
import cookieParser from "cookie-parser";
import camelcaseKeys from "camelcase-keys";
import logger from "./logger";
import config from "../config";
import { AppError } from "@/utils/appError";
import routes from "@/api/routes";

export default async (app: express.Application) => {
  async function setupViewEngine() {
    // app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  }

  async function setupMiddleware() {
    app.use((req, res, next) => {
      req.body = camelcaseKeys(req.body, { deep: true });
      req.params = camelcaseKeys(req.params);
      req.query = camelcaseKeys(req.query);
      next();
    });

    app.use((req, res, next) => {
      logger.info(`${req.method} ${req.originalUrl}`);
      next();
    });
  }

  async function setupRoutes() {
    app.use(config.api.prefix, routes());
  }

  async function setupHandleUndefinedRoutes() {
    app.use("*", (req, res, next) => {
      //   const err = new AppError(404, "fail", "undefined route");
      const err = new AppError(404, "Undefined route");
      next(err);
    });

    // error handlers
    app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === "UnauthorizedError") {
          return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
      }
    );
    app.use(
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
        res.status(err.status).json({
          error: err,
          stack: err.stack,
        }).end();
      }
    );
  }

  async function init() {
    await setupViewEngine();
    setupMiddleware();
    setupRoutes();
    setupHandleUndefinedRoutes();
  }

  init();

  return app;
};
