import express from 'express';
import ExpressLoader from './express';
import logger from './logger';
import MongooseLoader from './mongoose';
import InversifyLoader from './inversify';

export default async (expressApp: express.Application) => {
  const mongoose = await new MongooseLoader().connection;
  // const mongoConnection = mongoose.db; // use for agenda
  logger.info('✌️ DB loaded and connected!');

  const myContainer = new InversifyLoader().container;
  logger.info('✌️ Inversify loaded!');

  const expresstLoader = new ExpressLoader(expressApp, myContainer);
  logger.info('✌️ Express loaded');
};
