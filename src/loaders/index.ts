import express from 'express';
import ExpressLoader from './express';
import logger from './logger';
import MongooseLoader from './mongoose';
import InversifyLoader from './inversify';

export default async (expressApp: express.Application) => {
  await MongooseLoader.init();
  // const mongoConnection = mongoose.db; // use for agenda
  logger.info('✌️ DB loaded and connected!');

  // InversifyLoader.init();
  logger.info('✌️ Inversify loaded!');

  const expresstLoader = new ExpressLoader(expressApp);
  logger.info('✌️ Express loaded');
};
