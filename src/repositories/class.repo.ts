import { Class, ClassDoc } from "@/models";
import { TYPES } from "@/utils/type";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { BaseRepository, IRepository } from "./base.repo";

export interface IClassRepository extends IRepository<ClassDoc>{

}

@injectable()
export default class ClassRepository extends BaseRepository<ClassDoc> implements IClassRepository {
    constructor(@inject(TYPES.ClassModel) _class: Class) {
        super(_class.model);
    }
}