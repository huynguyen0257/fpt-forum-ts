export class ErrorMsg {
  public readonly status: number;
  public readonly message: string;
  public readonly error: any;
  constructor(status: number, error: any, message?: string) {
    this.status = status;
    this.error = error;
    this.message = message;
  }
}
