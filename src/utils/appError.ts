export class AppError {
  public readonly status: number;
  public readonly error: any;
  constructor(status: number, error: any) {
    this.status = status;
    this.error = error;
  }
}
