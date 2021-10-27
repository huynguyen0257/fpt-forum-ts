import Mongoose = require('mongoose');
import config from '../config';
import logger from './logger';

export default class MongooseLoader {
  public static connection: Mongoose.Connection;

  public static async init() {
    this.connection = (
      await Mongoose.connect(config.databaseURL, {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
      })
    ).connection;
  }
}
