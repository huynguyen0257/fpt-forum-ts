import { ClassDoc } from '@/models/class';
import { User, IClass } from '@/models';
import { BaseService, IService } from './base.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/utils/type';
import { IClassRepository } from '@/repositories/class.repo';

export interface IClassService extends IService<ClassDoc> {}

@injectable()
export class ClassService
  extends BaseService<ClassDoc, IClassRepository>
  implements IClassService
{
  constructor(@inject(TYPES.IClassRepository) _repository: IClassRepository) {
    super(_repository);
  }

  // public async find(
  //   cond?: object,
  //   fields?: object,
  //   options?: object
  // ): Promise<ClassDoc[]> {
  //   const resultList = await this._model
  //     .find(cond, fields, options)
  //     .populate({ path: "students", model: User });
  //   return resultList;
  // }
}
