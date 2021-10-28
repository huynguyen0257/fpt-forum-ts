import { Schema, model, Document, Model } from 'mongoose';
/**
 * Interface of "Role" model use in project
 * Notice for typescript is aware of the object "Role"
 */
export interface IRole {
  roleName: string;
  users: object[] | null;
  created: Date;
}

/**
 * Interface of Mongoose Document
 * Provide function relative to "Role" model. Ex: Document.save, Document.delete
 */
export interface RoleDoc extends Document {
  roleName: string;
  users: object[] | null;
  created: Date;
}

/**
 * Interface of Mongoose Model
 * Provide function relative to  "Role" Collection. Ex: CRUD
 *
 * (+) Add more customize function here to react with "Role" Collection.
 * Ex: Model.build(data:IRole): RoleDoc
 */
export interface RoleModel extends Model<RoleDoc> {
  build(data: IRole): RoleDoc;
}

/**
 * Main class config "Role" model to mongoDB
 * Add more function & middle to "Role" model
 * Provide "Role" Model for interact with mongoDb via mongoose
 */
export class Role {
  public static roleName: string;
  public static model: Model<RoleDoc>;

  // static block, run when runtime load all files - Only file use in 'import' keyword, belong to /src/app.ts
  static {
    const schema = new Schema({
      roleName: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
      },
      users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      created: { type: Date, default: Date.now }
    });

    schema.statics.build = (data: IRole): RoleDoc => {
      return new this.model(data);
    };

    this.model = model<RoleDoc>('Role', schema);
  }
}
