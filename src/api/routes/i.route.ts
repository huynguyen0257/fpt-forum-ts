import { Router } from 'express';

export default interface IRoute<T> {
  route: Router;
  init(): void;
  setupGlobalMiddleware(): void;
}
