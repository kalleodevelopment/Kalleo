import ApolloClient from 'apollo-client';
import fetch from 'node-fetch';
import networkInterface from './networkInterface';

global.fetch = fetch;

const client = new ApolloClient({
  networkInterface,
});

export default client;
