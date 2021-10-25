import { Class, ClassDoc, ClassModel } from "@/models";
import { TYPES } from "@/utils/type";
import { Container } from "inversify";
import mongoose, { Connection, Model, Mongoose } from "mongoose";
import config from "../config";

export default class MongooseLoader {
  private _connection: Connection;
  constructor() {
    this.initDb();
  }
  
  private async initDb() {
    this._connection = (
      await mongoose.connect(config.databaseURL, {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      })
    ).connection;
  }

  public get connection(): Connection {
    return this._connection;
  }
}
