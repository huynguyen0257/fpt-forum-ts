import express from "express";
import config from "./config";
import logger from "./loaders/logger";
import "module-alias/register";
import 'reflect-metadata';

async function startServer() {
  const app = express();
  /*
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   */
  await require("./loaders").default(app);

  app
    .listen(config.port, () => {
        logger.info(`
        ##################################################
        🛡️\tServer listening on port: ${config.port}\t\t🛡️
        ##################################################
      `);
    })
    .on("error", (err) => {
      logger.error(err);
      process.exit(1);
    });
}

startServer();
