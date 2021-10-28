import { RoleDoc } from '@/models';
import { BaseService, IService } from './base.service';
import { inject, injectable } from 'inversify';
import { INVERSIFY } from '@/utils/inversify.type';
import { IRoleRepository } from '@/repositories';

export interface IRoleService extends IService<RoleDoc> {}

@injectable()
export class RoleService
  extends BaseService<RoleDoc, IRoleRepository>
  implements IRoleService
{
  constructor(@inject(INVERSIFY.IRoleRepository) _repository: IRoleRepository) {
    super(_repository);
  }
}
