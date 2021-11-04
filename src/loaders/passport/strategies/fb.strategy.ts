import FbStrategy, { StrategyOption, Profile } from 'passport-facebook';
import config from '@/config';
import { User, IUser } from '@/models';
export default class FacebookStrategy {
  public static instance: FbStrategy.Strategy;

  /**
   * Only use in login by facebook
   * - Check Fb.id:
   *  + Exist: return login success ✅
   *  + Not exist -> Check
   *    + Email exist: done error existed email ❌
   *    + Email not exist: create new user ✅
   */
  static {
    FacebookStrategy.instance = new FbStrategy.Strategy(
      {
        clientID: config.fb_app_id,
        clientSecret: config.fb_app_secret,
        callbackURL: config.fb_callback_url,
        profileFields: ['name', 'email', 'gender', 'photos']
      },
      async (accessToken, refreshToken, profile: Profile, done) => {
        try {
          const existFbUser = await User.model.findOne({
            facebook: profile._json.id
          });
          if (existFbUser) {
            return done(null, existFbUser);
          } else {
            const existingEmailUser = await User.model.findOne({
              emailAddress: profile._json.email
            });
            if (existingEmailUser) {
              return done({
                message: `There is already an account using ${profile._json.email} email address`
              });
            } else {
              const user: IUser = {
                emailAddress: profile._json.email,
                username: profile._json.email,
                facebook: profile.id,
                tokens: [{ kind: 'facebook', accessToken }],
                fullName: `${profile.name.givenName} ${profile.name.familyName}`
              };
              await User.model.create(user);
              return done(null, user);
            }
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    );
  }
}
