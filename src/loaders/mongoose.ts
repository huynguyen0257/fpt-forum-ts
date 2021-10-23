import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  });
  return connection.connection.db;
};
