import { Schema, model, Document, Model, Connection } from 'mongoose';
/**
 * Interface of "Class" model use in project
 * Notice for typescript is aware of the object "Class"
 */
export interface IClass {
  code: string;
  maxStudent: number;
  classes: object[] | null;
  created: Date;
}

/**
 * Interface of Mongoose Document
 * Provide function relative to "Class" model. Ex: Document.save, Document.delete
 */
export interface ClassDoc extends Document {
  code: string;
  maxStudent: number;
  classes: object[] | null;
  created: Date;
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
 * Add more function & middle to "Class" model
 * Provide "Class" Model for interact with mongoDb via mongoose
 */
export class Class {
  public static model: Model<ClassDoc>;

  // static block, run when runtime load all files - Only file use in 'import' keyword, belong to /src/app.ts
  static {
    const schema = new Schema({
      code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
      },
      maxStudent: { type: Number, required: true },
      students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      created: { type: Date, default: Date.now }
    });

    schema.statics.build = (data: IClass): ClassDoc => {
      return new this.model(data);
    };

    this.model = model<ClassDoc>('Class', schema);
  }
}
