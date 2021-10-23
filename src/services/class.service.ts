import { Service, Inject, Container } from "typedi";
import { IClass, ClassModel } from "@/models/class";
import { FilterQuery } from "mongoose";
import { User } from "@/models";

@Service()
export default class ClassService {
  constructor(@Inject("classModel") private _classModel: ClassModel) {}

  public async getOne(query: FilterQuery<IClass>): Promise<IClass> {
    const result = await this._classModel.findOne(query);
    return result;
  }

  public async getById(id: string) {
    return await this._classModel.findById(id);
  }

  public async getAll() {
    const resultList = await this._classModel
      .find()
      .populate({ path: "students", model: User });
    return resultList;
  }

  public async create(model: any) {
    try {
      return await this._classModel.create(model);
    } catch (error) {
      throw error;
    }
  }
}
