import { Role, User, UserDoc } from '@/models';
import JwtStrategy from 'passport-jwt';
import fs from 'fs';
import config from '@/config';
export default class JWTStrategy {
  public static instance: JwtStrategy.Strategy;
  static {
    const opts: JwtStrategy.StrategyOptions = {
      jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtPublicKey,
      algorithms: ['RS256']
    };
    JWTStrategy.instance = new JwtStrategy.Strategy(
      opts,
      (jwtPayload, done) => {
        User.model
          .findById(jwtPayload.id, (err: Error, user: UserDoc) => {
            if (err) {
              return done(err, false);
            }
            if (user) {
              return done(null, user, jwtPayload);
            } else {
              return done(null, false);
            }
          })
          .populate({ path: 'roles', model: Role.model });
      }
    );
  }
}
