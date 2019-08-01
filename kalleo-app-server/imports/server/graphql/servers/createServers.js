import { WebApp } from 'meteor/webapp';
import { createApolloServer } from 'meteor/apollo';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import schema from './schema';
import onSubscriptionOperation from './onSubscriptionOperation';
import { getAuthMiddleware } from '../../auth';
import { ENABLE_GRAPHIQL } from '../../config';

const createServers = () => {
  createApolloServer(request => ({
    schema,
    context: {
      subscriber: request.subscriber,
    },
  }), {
    configServer: (server) => {
      server.use(getAuthMiddleware());
    },
    graphiql: ENABLE_GRAPHIQL,
  });

  new SubscriptionServer({ // eslint-disable-line no-new
    schema,
    execute,
    subscribe,
    onOperation: onSubscriptionOperation,
  }, {
    server: WebApp.httpServer,
    path: '/subscriptions',
  });
};

export default createServers;
