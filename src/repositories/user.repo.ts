import { User, UserDoc } from '@/models';
import { TYPES } from '@/utils/type';
import { inject, injectable } from 'inversify';
import { Query } from 'mongoose';
import mongoose from 'mongoose';
import { BaseRepository, IRepository } from './base.repo';

export interface IUserRepository extends IRepository<UserDoc> {}

@injectable()
export class UserRepository
  extends BaseRepository<UserDoc>
  implements IUserRepository
{
  constructor() {
    var UserModel = mongoose.model<UserDoc>('User');
    super(UserModel);
  }

  // public find(
  //   cond?: object,
  //   fields?: object,
  //   options?: object
  // ): Query<UserDoc[], any> {
  //   const rs = this._model
  //     .find(cond, fields, options)
  //     .populate({ path: 'classes', model: Class });
  //   console.log(`typeof(rs): ${typeof rs}`);
  //   return rs;
  // }
}
