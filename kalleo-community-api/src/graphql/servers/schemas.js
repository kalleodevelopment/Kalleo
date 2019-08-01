import { maskErrors } from 'graphql-errors';
import { makeExecutableSchema } from 'graphql-tools';
import { appTypes, publicTypes } from '../types';
import { appMutations, publicMutations } from '../mutations';
import { appQueries, publicQueries } from '../queries';
import { appResolverMaps, publicResolverMaps } from '../resolver-maps';

const appResolvers = {
  ...appResolverMaps,
  Mutation: appMutations,
  Query: appQueries,
};

const publicResolvers = {
  ...publicResolverMaps,
  Mutation: publicMutations,
  Query: publicQueries,
};

export const publicSchema = makeExecutableSchema({
  typeDefs: publicTypes,
  resolvers: publicResolvers,
});

export const appSchema = makeExecutableSchema({
  typeDefs: appTypes,
  resolvers: appResolvers,
});

maskErrors(publicSchema);
maskErrors(appSchema);
