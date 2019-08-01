import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { NODE_ENV, PORT } from './config';
import { configureAuth } from './auth';
import { connectToDb } from './db';
import { createGraphqlServers } from './graphql';
import { logError, rollbar } from './logging';

const startServer = async () => {
  await connectToDb();

  const app = express();

  if (NODE_ENV === 'production') {
    app.use(rollbar.errorHandler());
  }

  app.use(cors());
  app.use(helmet());

  configureAuth(app);

  const apolloEngine = createGraphqlServers(app);

  if (apolloEngine) {
    apolloEngine.listen({
      port: PORT,
      expressApp: app,
    }, () => {
      console.log(`Apollo Engine is now listening on port ${PORT}.`);
    });
  } else {
    const server = app.listen(PORT, () => {
      const { port } = server.address();

      console.log(`GraphQL Server is now running on port ${port}.`);
    });
  }
};

startServer().catch((error) => {
  logError({ error });
});
