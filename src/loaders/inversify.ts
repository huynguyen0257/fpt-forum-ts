import { Container } from "inversify";
import { TYPES } from "@/utils/type";
import ClassRepository, { IClassRepository } from "@/repositories/class.repo";
import ClassService, { IClassService } from "@/services/class.service";
import { Class } from "@/models";
import {ClassController} from "@/api/controllers";

export default class InversifyLoader {
  private _container: Container;

  constructor() {
    this._container = new Container();
    this._container.bind(TYPES.ClassModel).to(Class);
    this._container.bind<IClassRepository>(TYPES.ClassRepository).to(ClassRepository);
    this._container.bind<IClassService>(TYPES.ClassService).to(ClassService);
    this._container.bind(TYPES.ClassController).to(ClassController);
  }

  public get container(): Container {
    return this._container;
  }
}
