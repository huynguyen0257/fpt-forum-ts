export class ErrorMsg {
  public readonly status: number;
  public readonly name: string;
  public readonly message: string;
  public readonly stack?: any;
  constructor(status: number, name: string, message?: string, stack?: any) {
    this.status = status;
    // this.error = error;
    this.name = name;
    this.message = message;
    this.stack = stack;
  }
}
