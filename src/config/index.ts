import dotenv from 'dotenv';
import fs from 'fs';

const envFound = dotenv.config({
  path: './.env.example'
});
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: process.env.PORT || 3000,
  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtPrivateKey: fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH),
  jwtPublicKey: fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api/v1'
  },

  nodeEnv: process.env.NODE_ENV || 'product',

  /**
   * passport-facebook config
   */
  fb_app_id: process.env.FACEBOOK_APP_ID,
  fb_app_secret: process.env.FACEBOOK_APP_SECRET,
  fb_callback_url: process.env.FACEBOOK_CALL_BACK_URL
};
