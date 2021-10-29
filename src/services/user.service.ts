import { UserDoc, ClassDoc, RoleDoc, Role, Class } from '@/models';
import { BaseService, IService } from './base.service';
import { inject, injectable } from 'inversify';
import { INVERSIFY } from '@/utils/inversify.type';
import { IRoleRepository, IUserRepository } from '@/repositories';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import InversifyLoader from '@/loaders/inversify';
import logger from '@/loaders/logger';

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
      .populate({ path: 'roles', model: Role.model })
      .populate({ path: 'classes', model: Class.model });
  }
  public async findOne(cond?: object): Promise<UserDoc> {
    return await this._repository
      .findOne(cond)
      .populate({ path: 'roles', model: Role.model })
      .populate({ path: 'classes', model: Class.model });
  }
  public async addRole(user: UserDoc, roleIds: string[]): Promise<boolean> {
    try {
      const savedRoles: RoleDoc[] = [];
      const oldUserRoles: any[] = user.roles;
      const newUserRoleIds: any[] = roleIds;
      try {
        // add user to role & add role to user
        for (const roleId of newUserRoleIds) {
          // Update role.users of newUserRoles
          const role = await this._roleRepo.findById(roleId);
          if (role == null)
            throw new Error(`addRole Service Exeption no roleId ${roleId}`);

          // Adding user while role.users not contain it
          if (role.users.indexOf(user._id) === -1) {
            role.users.push(user._id);
            // await to avoid save() the same document multiple time in parallel when error happen
            await role.save();
            savedRoles.push(role);
          }
        }

        // remove user not available in role
        for (const oleUserRole of oldUserRoles) {
          if (newUserRoleIds.indexOf(oleUserRole._id + '') === -1) {
            const oldRole = await this._roleRepo.findById(oleUserRole._id);
            oldRole.users.remove(user._id);
            oldRole.save();
          }
        }
      } catch (error) {
        // Remove previous updated role when update current role have exception
        for (const savedRole of savedRoles) {
          const index = savedRole.users.indexOf(user._id);
          if (index > -1) {
            savedRole.users.splice(index, 1);
            savedRole.save();
          }
        }
        throw error;
      }
      user.roles = newUserRoleIds;
      await user.save();
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  public async checkPassword(
    password: string,
    user: UserDoc
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  static {
    if (!Array.prototype.remove) {
      Array.prototype.remove = function <T>(this: T[], elem: T): T[] {
        return this.filter((e) => e !== elem);
      };
    }
  }
}
