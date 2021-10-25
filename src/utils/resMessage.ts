export class ResMessage {
    public readonly status: number;
    public readonly message?: string;
    public readonly data?: object;
    constructor(status: number, message: string, data?: object) {
      this.status = status;
      this.message= message;
      this.data= data;
    }
  }
