import { User, IUser, UserDoc, ClassDoc } from '@/models';
import { BaseService, IService } from './base.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/utils/type';
import { IUserRepository } from '@/repositories';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserService extends IService<UserDoc> {
  checkPassword(password: string, user: UserDoc): Promise<boolean>;
}

@injectable()
export class UserService
  extends BaseService<UserDoc, IUserRepository>
  implements IUserService
{
  constructor(@inject(TYPES.IUserRepository) _repository: IUserRepository) {
    super(_repository);
  }

  public async findById(id: string): Promise<UserDoc> {
    return await this._repository
      .findById(id)
      .populate({ path: 'classes', model: mongoose.model<ClassDoc>('Class') });
  }
  public async findOne(cond?: object): Promise<UserDoc> {
    return await this._repository
      .findOne(cond)
      .populate({ path: 'classes', model: mongoose.model<ClassDoc>('Class') });
  }

  public async checkPassword(password: string, user: UserDoc) {
    return await bcrypt.compare(password, user.password);
  }
}
