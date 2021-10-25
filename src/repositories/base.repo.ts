import { Container } from "typedi";
import {
  Document,
  Model,
  Query,
  Types,
  FilterQuery,
} from "mongoose";
import { DeleteResult, UpdateResult } from "mongodb";
import { injectable, unmanaged } from "inversify";

export interface IRepository<T extends Document> {
  findById: (id: string) => Query<T, any>;
  findOne: (cond?: object) => Query<T, any>;
  find: (cond?: object, fields?: object, options?: object) => Query<T[], any>;
  create: (data: object) => Promise<T | null>;
  updateOne: (_id: Types.ObjectId, data: T) => Promise<UpdateResult>;
  deleteOne: (_id: Types.ObjectId) => Promise<DeleteResult>;
}

@injectable()
export abstract class BaseRepository<T extends Document>
  implements IRepository<T>
{
  public _model: Model<T>;
  constructor(@unmanaged() model: Model<T>) {
    this._model = model;
  }
  public findById(id: string): Query<T, any> {
    return this._model.findById(id);
  }
  public findOne(cond?: object): Query<T, any> {
    return this._model.findOne(cond);
  }

  public find(
    cond?: object,
    fields?: object,
    options?: object
  ): Query<T[], any> {
    return this._model.find(cond, fields, options);
  }

  public async create(model: object) {
    return await this._model.create(model);
  }

  // public updateOne(id: Types.ObjectId, data: T): Query<UpdateWriteOpResult, T> {
  public async updateOne(
    id: Types.ObjectId,
    data: T
  ): Promise<UpdateResult> {
    return this._model.updateOne({ _id: id } as FilterQuery<T>, data as object);
  }

  public async deleteOne(id: Types.ObjectId): Promise<DeleteResult> {
    return this._model.deleteOne({ _id: id } as FilterQuery<T>);
  }
}
