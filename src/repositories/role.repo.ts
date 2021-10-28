import { RoleDoc, Role } from '@/models';
import { injectable } from 'inversify';
import { BaseRepository, IRepository } from './base.repo';
// import RoleModel = require('@/models/schemas/class.schema');

export interface IRoleRepository extends IRepository<RoleDoc> {}

@injectable()
export class RoleRepository
  extends BaseRepository<RoleDoc>
  implements IRoleRepository
{
  constructor() {
    super(Role.model);
  }
}
