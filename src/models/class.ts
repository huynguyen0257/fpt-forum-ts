import { injectable, unmanaged } from 'inversify';
import { Schema, model, Document, Model, Connection } from 'mongoose';
/**
 * Interface of "Class" model use in project
 * Notice for typescript is aware of the object "Class"
 */
export interface IClass {
  code: string;
  maxStudent: number;
  classes: object[] | null;
}

/**
 * Interface of Mongoose Document
 * Provide function relative to "Class" model. Ex: Document.save, Document.delete
 */
export interface ClassDoc extends Document {
  code: string;
  maxStudent: number;
  classes: object[] | null;
}

/**
 * Interface of Mongoose Model
 * Provide function relative to  "Class" Collection. Ex: CRUD
 *
 * (+) Add more customize function here to react with "Class" Collection.
 * Ex: Model.build(data:IClass): ClassDoc
 */
export interface ClassModel extends Model<ClassDoc> {
  build(data: IClass): ClassDoc;
}

/**
 * Main class config "Class" model to mongoDB
 * Add more funciton & middle to "Class" model
 * Provide "Class" Model for interact with mongoDb via mongoose
 */
export class Class {
  private _model: Model<ClassDoc>;
  constructor() {
    const schema = new Schema({
      code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
      },
      maxStudent: {
        type: Number,
        required: true
      },
      students: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    });

    schema.statics.build = (data: IClass): ClassDoc => {
      return new this._model(data);
    };

    this._model = model<ClassDoc>('Class', schema);
  }

  public get model(): Model<ClassDoc> {
    return this._model;
  }
}
