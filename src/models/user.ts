import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  classes: object[] | null;
}

export interface UserDoc extends Document {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  classes: object[] | null;
}

export interface UserModel extends Model<IUser> {
  build(data: IUser): UserDoc;
}

export class User {
  public static model: Model<IUser>;

  // static block, run when runtime load all files - Only file use in 'import' keyword, belong to /src/app.ts
  static {
    const schema = new Schema({
      username: { type: String, required: true },
      password: { type: String, required: true },
      fullName: { type: String, required: true },
      phoneNumber: {
        type: String,
        required: true,
        match: [
          /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
          'Please fill in a valid phone number'
        ]
      },
      emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please fill a valid email address'
        ]
      },
      classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
    });

    schema.statics.build = (data: IUser): UserDoc => {
      return new this.model(data);
    };

    schema.pre('save', function (next) {
      this.password = bcrypt.hashSync(this.password, 10);
      next();
    });

    this.model = model<IUser>('User', schema);
  }
}
