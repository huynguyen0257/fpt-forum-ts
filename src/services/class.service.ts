import { ClassDoc } from '@/models';
import { BaseService, IService } from './base.service';
import { inject, injectable } from 'inversify';
import { INVERSIFY } from '@/utils/inversify.type';
import { IClassRepository } from '@/repositories';

export interface IClassService extends IService<ClassDoc> {}

@injectable()
export class ClassService
  extends BaseService<ClassDoc, IClassRepository>
  implements IClassService
{
  constructor(
    @inject(INVERSIFY.IClassRepository) _repository: IClassRepository
  ) {
    super(_repository);
  }
}
