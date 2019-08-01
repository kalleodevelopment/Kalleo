import { maskErrors } from 'graphql-errors';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../types';
import scalars from '../scalars';
import Query from '../queries';
import Mutation from '../mutations';
import Subscription from '../subscriptions';
import resolverMaps from '../resolver-maps';

const resolvers = {
  ...scalars,
  ...resolverMaps,
  Query,
  Mutation,
  Subscription,
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

maskErrors(schema);

export default schema;
