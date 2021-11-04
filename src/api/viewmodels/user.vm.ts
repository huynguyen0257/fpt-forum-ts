/* tslint:disable:max-classes-per-file */
import { Expose } from 'class-transformer';
export class UserVM {
  @Expose() id: string;
  @Expose() username: string;
  @Expose() fullName: string;
  @Expose() phoneNumber: string;
  @Expose() emailAddress: string;
  @Expose() facebook: string;
  @Expose() classes?: object[];
  @Expose() created: string;
}
export class UserCM {
  @Expose() username: string;
  @Expose() password: string;
  @Expose() fullName: string;
  @Expose() phoneNumber: string;
  @Expose() emailAddress: string;
  @Expose() classId?: string;
}
export class UserUM {
  @Expose() id: string;
  @Expose() fullName: string;
  @Expose() phoneNumber: string;
  @Expose() emailAddress: string;
}
