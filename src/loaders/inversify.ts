import { Container } from 'inversify';
import { INVERSIFY } from '@/utils/inversify.type';
import {
  ClassRepository,
  IClassRepository,
  IRoleRepository,
  IUserRepository,
  RoleRepository,
  UserRepository
} from '@/repositories';
import { ClassService, IClassService } from '@/services/class.service';
import { IUserService, UserService } from '@/services';
import { IRoleService, RoleService } from '@/services/role.service';

export default class InversifyLoader {
  public static container: Container;

  // Run when call with InversifyLoader.init()
  static {
    this.container = new Container();

    // Class Model
    this.container
      .bind<IClassRepository>(INVERSIFY.IClassRepository)
      .to(ClassRepository);
    this.container
      .bind<IClassService>(INVERSIFY.IClassService)
      .to(ClassService);

    // User Model
    this.container
      .bind<IUserRepository>(INVERSIFY.IUserRepository)
      .to(UserRepository);
    this.container.bind<IUserService>(INVERSIFY.IUserService).to(UserService);

    // Role Model
    this.container
      .bind<IRoleRepository>(INVERSIFY.IRoleRepository)
      .to(RoleRepository);
    this.container.bind<IRoleService>(INVERSIFY.IRoleService).to(RoleService);
  }
}
