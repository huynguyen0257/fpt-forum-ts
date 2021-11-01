import { User } from '@/models';
import Strategy from 'passport-local';
import bcrypt from 'bcryptjs';

export default class LocalStrategy {
  public static instance: Strategy.Strategy;
  static {
    LocalStrategy.instance = new Strategy.Strategy(
      (username, password, done) => {
        // login username, password
        User.model
          .findOne({ username })
          .then((user) => {
            // cb_type_2 done(null, false);
            if (!user) done(null, false);

            // cb_type_3 done(null, { id: "1234", fullName: "Nguyen Gia Huy" });
            if (bcrypt.compareSync(password, user.password)) done(null, user);
            else done(null, false);
          })
          .catch((err) => {
            // cb_type_1 done("error");
            done(err);
          });
      }
    );
  }
}
