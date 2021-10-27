import { Container } from 'inversify';
import { TYPES } from '@/utils/type';
import {
  ClassRepository,
  IClassRepository,
  IUserRepository,
  UserRepository
} from '@/repositories';
import { ClassService, IClassService } from '@/services/class.service';
import { IUserService, UserService } from '@/services';

export default class InversifyLoader {
  public static container: Container;

  // Run when call with InversifyLoader.init()
  static {
    this.container = new Container();

    // Class Model
    this.container
      .bind<IClassRepository>(TYPES.IClassRepository)
      .to(ClassRepository);
    this.container.bind<IClassService>(TYPES.IClassService).to(ClassService);

    // User Model
    this.container
      .bind<IUserRepository>(TYPES.IUserRepository)
      .to(UserRepository);
    this.container.bind<IUserService>(TYPES.IUserService).to(UserService);
  }
}
