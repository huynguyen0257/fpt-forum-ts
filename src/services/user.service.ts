import { User, IUser, UserDoc, ClassDoc } from '@/models';
import { BaseService, IService } from './base.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/utils/type';
import { IUserRepository } from '@/repositories';
// import ClassModel = require('@/models/schemas/class.schema');
// import mongoose from 'mongoose';

export interface IUserService extends IService<UserDoc> {}

@injectable()
export class UserService
  extends BaseService<UserDoc, IUserRepository>
  implements IUserService
{
  constructor(@inject(TYPES.IUserRepository) _repository: IUserRepository) {
    super(_repository);
  }

  public async findById(id: string): Promise<UserDoc> {
    return await this._repository.findById(id);
    // .populate({ path: 'classes', model: mongoose.model<ClassDoc>('Class') });
  }
  public async findOne(cond?: object): Promise<UserDoc> {
    return await this._repository.findOne(cond);
    // .populate({ path: 'classes', model: mongoose.model<ClassDoc>('Class') });
  }
}
