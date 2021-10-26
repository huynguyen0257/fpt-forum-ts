import { ClassDoc } from '@/models';
import { TYPES } from '@/utils/type';
import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { BaseRepository, IRepository } from './base.repo';
// import ClassModel = require('@/models/schemas/class.schema');

export interface IClassRepository extends IRepository<ClassDoc> {}

@injectable()
export class ClassRepository
  extends BaseRepository<ClassDoc>
  implements IClassRepository
{
  constructor() {
    var ClassModel = mongoose.model<ClassDoc>('Class');
    super(ClassModel);
  }
}
