import { UserDoc, ClassDoc, RoleDoc } from '@/models';
import { BaseService, IService } from './base.service';
import { inject, injectable } from 'inversify';
import { INVERSIFY } from '@/utils/inversify.type';
import { IRoleRepository, IUserRepository } from '@/repositories';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import InversifyLoader from '@/loaders/inversify';
import { ErrorMsg } from '@/utils/appError';
import { error } from 'winston';

export interface IUserService extends IService<UserDoc> {
  checkPassword(password: string, user: UserDoc): Promise<boolean>;
  addRole(model: UserDoc, roleIds: string[]): Promise<boolean>;
}

@injectable()
export class UserService
  extends BaseService<UserDoc, IUserRepository>
  implements IUserService
{
  private readonly _roleRepo: IRoleRepository;
  constructor(@inject(INVERSIFY.IUserRepository) _repository: IUserRepository) {
    super(_repository);
    this._roleRepo = InversifyLoader.container.get(INVERSIFY.IRoleRepository);
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
  public async addRole(model: UserDoc, roleIds: string[]): Promise<boolean> {
    try {
      model.roles = roleIds as any[];
      const savedRoles: RoleDoc[] = [];
      let count = 0;
      try {
        for (const roleId of roleIds) {
          count++;
          const role = await this._roleRepo.findById(roleId);
          if (role == null) throw new Error('something error');
          if (role.users.indexOf(model._id) == -1) {
            role.users.push(model._id);
            await role.save(); //await to avoid save() the same document multiple time in parallel when error happen
            savedRoles.push(role);
          }
        }
      } catch (error) {
        for (const savedRole of savedRoles) {
          const index = savedRole.users.indexOf(model._id);
          if (index > -1) {
            savedRole.users.splice(index, 1);
            savedRole.save();
          }
        }
        throw new Error('something error');
      }
      model.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  public async checkPassword(
    password: string,
    user: UserDoc
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
