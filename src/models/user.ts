import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import logger from '@/loaders/logger';
import { ClassDoc, Role } from '.';

export interface IUser {
  username?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  facebook?: string;
  tokens?: AuthToken[];
  classes?: object[] | null;
  roles?: object[] | null;
  created?: Date;
}

export interface UserDoc extends Document {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  facebook: string;
  tokens: AuthToken[];
  classes: object[] | null;
  roles: object[] | null;
  created: Date;
}
export interface AuthToken {
  accessToken: string;
  kind: string;
}

export interface UserModel extends Model<IUser> {
  build(data: IUser): UserDoc;
}

export class User {
  public static model: Model<UserDoc>;

  // static block, run when runtime load all files - Only file use in 'import' keyword, belong to /src/app.ts
  static {
    const schema = new Schema({
      username: String,
      password: String,
      fullName: { type: String, required: true },
      phoneNumber: {
        type: String,
        // required: true,
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
      facebook: {
        type: String,
        unique: true
      },
      tokens: Array,
      classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
      roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
      created: { type: Date, default: Date.now }
    });

    schema.statics.build = (data: IUser): UserDoc => {
      return new this.model(data);
    };

    schema.pre('save', function (next) {
      logger.info('PreSave mongoose middlewares');
      if (this.isNew && this.password)
        this.password = bcrypt.hashSync(this.password, 10);
      next();
    });

    this.model = model<UserDoc>('User', schema);
  }
}
