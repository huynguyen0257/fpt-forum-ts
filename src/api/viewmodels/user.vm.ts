import { Expose } from 'class-transformer';
export class UserVM {
  @Expose() username: string;
  @Expose() fullName: string;
  @Expose() phoneNumber: string;
  @Expose() emailAddress: string;
  @Expose() classes?: object[];
  @Expose() created: string;
}
