import { Document, FilterQuery, Model, Types } from 'mongoose';
import { IRepository } from '@/repositories/base.repo';
import { injectable, unmanaged } from 'inversify';

export interface IService<T extends Document> {
  findById: (id: string) => Promise<T>;
  findOne: (cond?: object) => Promise<T>;
  find: (cond?: object, fields?: object, options?: object) => Promise<T[]>;
  create: (data: object) => Promise<T | null>;
  update: (_id: Types.ObjectId, data: object) => Promise<boolean>;
  delete: (_id: Types.ObjectId) => Promise<boolean>;
}

@injectable()
// Open/ Close Principle in SOLID which BaseService Open for extends but Close for modification
export abstract class BaseService<T extends Document, R extends IRepository<T>>
  implements IService<T>
{
  public _repository: R;
  constructor(repository: R) {
    this._repository = repository;
  }
  public async findById(id: string): Promise<T> {
    return await this._repository.findById(id);
  }
  public async findOne(cond?: object): Promise<T> {
    return await this._repository.findOne(cond);
  }

  public async find(
    cond?: object,
    fields?: object,
    options?: object
  ): Promise<T[]> {
    return await this._repository.find(cond, fields, options);
  }

  public async create(model: object) {
    return await this._repository.create(model);
  }

  public async update(id: Types.ObjectId, data: object): Promise<boolean> {
    const updateResult = await this._repository.updateOne(id, data as any);
    return updateResult.acknowledged;
  }
  public async delete(id: Types.ObjectId): Promise<boolean> {
    const deleteResult = await this._repository.deleteOne(id);
    return deleteResult.acknowledged;
  }
}
