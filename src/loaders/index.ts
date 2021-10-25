import express from "express";
import expressLoader from "./express";
import logger from "./logger";
import MongooseLoader from "./mongoose";
import dependencyInjector from "./dependencyInjector";
import { User, Class } from "@/models";
import InversifyLoader from "./inversify";

export default async (expressApp: express.Application) => {
  const mongoose = new MongooseLoader().connection;
  // const mongoConnection = mongoose.db; // use for agenda
  logger.info("✌️ DB loaded and connected!");

  const myContainer = new InversifyLoader().container;
  logger.info("✌️ Inversify loaded!");

  // require('@/models');
  // const userModel = { name: "userModel", model: new User().model };
  // // const classModel = { name: "classModel", model: new Class().model };
  // await dependencyInjector({
  //   mongoConnection,
  //   models: [
  //     userModel,
  //     // classModel
  //   ],
  // });

  await expressLoader(expressApp, myContainer);
  logger.info("✌️ Express loaded");
};
