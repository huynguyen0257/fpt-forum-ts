import { Schema, model, Document, Model } from "mongoose";

export interface IClass extends Document {
  code: string;
  maxStudent: number;
  classes: object[] | null;
}

export interface ClassModel extends Model<IClass> {}

export class Class {
  private _model: Model<IClass>;
  constructor() {
    const schema = new Schema({
      code: {
        type: String,
        required: true,
      },
      maxStudent: {
        type: Number,
        required: true,
      },
      students: [
        {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    });

    this._model = model<IClass>("Class", schema);
  }

  public get model(): Model<IClass> {
    return this._model;
  }
}
