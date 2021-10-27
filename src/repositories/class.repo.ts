import { ClassDoc, Class } from '@/models';
import { injectable } from 'inversify';
import { BaseRepository, IRepository } from './base.repo';
// import ClassModel = require('@/models/schemas/class.schema');

export interface IClassRepository extends IRepository<ClassDoc> {}

@injectable()
export class ClassRepository
  extends BaseRepository<ClassDoc>
  implements IClassRepository
{
  constructor() {
    super(Class.model);
  }
}
