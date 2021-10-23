import { Service, Inject, Container } from "typedi";
import { IUser, UserModel } from "@/models";
import { FilterQuery } from "mongoose";

@Service()
export default class UserService {
    private _userModel: UserModel;
  constructor() {
    this._userModel = Container.get('userModel');
  }

  public async getOne(query: FilterQuery<IUser>): Promise<IUser> {
    // const user = await this._userModel.findOne({emailAddress}).populate("classes");
    const user = await this._userModel.findOne(query);
    return user;
  }

  public async getById(id: string) {
    return await this._userModel.findById(id).populate("classes");
  }

  public async getAll() {
    const users = await this._userModel.find().populate("classes");
    return users;
  }

  public async create(model: any) {
    // var user = new this._userModel({username: username, password: password});
    try {
      return await this._userModel.create(model);
    } catch (error) {
      throw error;
    }
  }
}
