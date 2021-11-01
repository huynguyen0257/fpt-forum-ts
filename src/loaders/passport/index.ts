import passport from 'passport';
import JWTStrategy from './strategies/jwt.strategy';
import LocalStrategy from './strategies/local.strategy';
export default class MyPassport {
  static readonly passport = passport;
  static {
    this.passport.use(LocalStrategy.instance);
    this.passport.use(JWTStrategy.instance);
  }
}
