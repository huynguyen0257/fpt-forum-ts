import { ValidateRequest } from './validateRequest';

export * from './validateRequest';

export default class MyMiddlewares {
  private _validateRequest: ValidateRequest;
  constructor() {
    this.init();
  }

  private init() {
    this._validateRequest = new ValidateRequest();
  }

  public get ValidateRequest(): ValidateRequest {
    return this._validateRequest;
  }
}
