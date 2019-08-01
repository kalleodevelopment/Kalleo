import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { NODE_ENV } from './config';
/*
import { connectToDb } from './db';
import { createGraphqlServers } from './graphql';
import { logError, rollbar } from './logging';
import { configurePhoneRoutes } from './phone';
*/
import { seedDb } from './seeding';

if (NODE_ENV === 'development') {
  process.setMaxListeners(0);
}

const startServer = async () => {
  await connectToDb();
  await seedDb();

  createGraphqlServers();

  WebApp.connectHandlers.use(bodyParser.urlencoded({ extended: false }));
  WebApp.connectHandlers.use(bodyParser.json());
  WebApp.connectHandlers.use(helmet());

  configurePhoneRoutes();

  if (NODE_ENV === 'production') {
    WebApp.connectHandlers.use(rollbar.errorHandler());
  }
  
};

Meteor.startup(() => {
  startServer().catch((error) => {
    logError({ error });
  });
});
