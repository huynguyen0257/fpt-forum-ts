import { Class, User, UserDoc } from '@/models';
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
    super(User.model);
  }
}
