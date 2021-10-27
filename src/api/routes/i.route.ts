import { Router } from 'express';

export default interface IRoute<T> {
  readonly route: Router;
  readonly controller: T;
  init(): void;
  setupGlobalMiddleware(): void;
}
