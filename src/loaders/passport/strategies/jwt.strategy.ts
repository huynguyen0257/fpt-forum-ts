import { Role, User, UserDoc } from '@/models';
import JwtStrategy from 'passport-jwt';
import config from '@/config';
export default class JWTStrategy {
  public static instance: JwtStrategy.Strategy;
  static {
    let opts: JwtStrategy.StrategyOptions = {
      jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret
    };
    JWTStrategy.instance = new JwtStrategy.Strategy(opts, function (
      jwt_payload,
      done
    ) {
      User.model
        .findById(jwt_payload.id, function (err: Error, user: UserDoc) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user, jwt_payload);
          } else {
            return done(null, false);
          }
        })
        .populate({ path: 'roles', model: Role.model });
    });
  }
}
