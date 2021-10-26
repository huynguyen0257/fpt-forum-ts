import { Container } from 'inversify';
import { TYPES } from '@/utils/type';
import { User } from '@/models';
import { ClassController } from '@/api/controllers';
import {
  ClassRepository,
  IClassRepository,
  IUserRepository,
  UserRepository
} from '@/repositories';
import { ClassService, IClassService } from '@/services/class.service';
import { IUserService, UserService } from '@/services';

export default class InversifyLoader {
  private _container: Container;

  constructor() {
    this._container = new Container();

    // Class Model
    this._container
      .bind<IClassRepository>(TYPES.IClassRepository)
      .to(ClassRepository);
    this._container.bind<IClassService>(TYPES.IClassService).to(ClassService);

    // User Model
    this._container.bind(TYPES.UserModel).to(User);
    this._container
      .bind<IUserRepository>(TYPES.IUserRepository)
      .to(UserRepository);
    this._container.bind<IUserService>(TYPES.IUserService).to(UserService);
  }

  public get container(): Container {
    return this._container;
  }
}
