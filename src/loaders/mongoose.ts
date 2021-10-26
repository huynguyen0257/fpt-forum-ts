import { Class } from '@/models';
import Mongoose = require('mongoose');
import config from '../config';
import logger from './logger';

export default class MongooseLoader {
  private _connection: Mongoose.Connection;

  constructor() {
    new Class().model;
    this.initDb();
  }

  private async initDb() {
    this._connection = (
      await Mongoose.connect(config.databaseURL, {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
      })
    ).connection;

    // this.connection = Mongoose.connection;
    // this.connection.once('open', () => {
    //   logger.info('MongoDB connected.');
    // });
    // Mongoose.connect(config.databaseURL, {
    //   maxPoolSize: 10, // Maintain up to 10 socket connections
    //   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    //   socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
    // });
  }
  public get connection(): Mongoose.Connection {
    return this._connection;
  }
}
// MongooseLoader.initDb();
// export = MongooseLoader;
