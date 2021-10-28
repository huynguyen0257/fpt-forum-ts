import { User, UserDoc } from '@/models';
import { injectable } from 'inversify';
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
