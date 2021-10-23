import { Schema, model, Document, Model } from "mongoose";
import IObject from "@/utils/object";
import R from "ramda";

export interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  classes: object[] | null;
}

export interface UserModel extends Model<IUser> {}

export class User {
  private _model: Model<IUser>;

  constructor() {
    const schema = new Schema({
      username: { type: String, required: true },
      password: { type: String, required: true },
      fullName: { type: String, required: true },
      phoneNumber: {
        type: String,
        required: true,
        match: [
          /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
          "Please fill in a valid phone number",
        ],
      },
      emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      classes: [{ type: Schema.Types.ObjectId, ref: "Classes" }],
    });

    schema.methods.fromJson = (data: any) => {
      const user: IObject = {};
      R.forEachObjIndexed<IUser>((value: string, key: string) => {
        // if (key == 'transactions' && value) {
        //     block[key] = Transactions.fromJson(value);
        // } else {
        //     block[key] = value;
        // }
        user[key] = value;
      }, data);
      return user;
    };

    this._model = model<IUser>("User", schema);
  }

  public get model(): Model<IUser> {
    return this._model;
  }
}
