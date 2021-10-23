import express from "express";
import expressLoader from "./express";
import logger from "./logger";
import mongooseLoader from "./mongoose";
import dependencyInjector from "./dependencyInjector";
import { User, Class } from "@/models";

export default async (expressApp: express.Application) => {
  const mongoConnection = await mongooseLoader();
  logger.info("✌️ DB loaded and connected!");

  require('@/models');
  const userModel = { name: "userModel", model: new User().model };
  const classModel = { name: "classModel", model: new Class().model };
  await dependencyInjector({
    mongoConnection,
    models: [
      userModel,
      classModel
    ],
  });

  await expressLoader(expressApp);
  logger.info("✌️ Express loaded");
};
