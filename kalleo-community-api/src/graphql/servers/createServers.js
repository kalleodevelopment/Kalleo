import bodyParser from 'body-parser';
import { ApolloEngine } from 'apollo-engine';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import getAuthorizedSchema from './getAuthorizedSchema';
import {
  APOLLO_ENGINE_API_KEY,
  ENABLE_GRAPHIQL,
  GRAPHIQL_ROUTE,
  GRAPHQL_ROUTE,
} from '../../config';

const createServers = (app) => {
  app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress(request => ({
    schema: getAuthorizedSchema(request),
    context: {
      user: request.user,
    },
    tracing: true,
    cacheControl: true,
  })));

  if (ENABLE_GRAPHIQL) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({
      endpointURL: GRAPHQL_ROUTE,
    }));
  }

  if (APOLLO_ENGINE_API_KEY) {
    const apolloEngine = new ApolloEngine({
      apiKey: APOLLO_ENGINE_API_KEY,
    });

    return apolloEngine;
  }

  return false;
};

export default createServers;
