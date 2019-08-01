import { sanitizeCalls, sanitizeListings, sanitizeSubscribers } from './sanitize';
import { kalleoAppServer, kalleoCommunityApi } from './databases';
import { PostgresSubscriber, MongoCall, Listing } from './typings';
import { getMongoConditions } from './helpers';

export const connectToMongo = async () => {
  await kalleoAppServer.connect();
  await kalleoCommunityApi.connect();
};

export const closeMongoConnection = async () => {
  await kalleoAppServer.close();
  await kalleoCommunityApi.close();
};

export const findSubscribers = async (): Promise<PostgresSubscriber[]> => {
  const conditions = getMongoConditions();

  const subscribers = await kalleoAppServer.find('subscribers', conditions);

  return sanitizeSubscribers(subscribers);
};

export const findCalls = async () : Promise<MongoCall[]> => {
  const conditions = getMongoConditions();

  const calls = await kalleoAppServer.find('calls', conditions);

  return sanitizeCalls(calls);
};

export const findListings = async () : Promise<Listing[]> => {
  const conditions = getMongoConditions();

  const listings = await kalleoCommunityApi.find('listings', conditions);

  return sanitizeListings(listings);
};

export const getBlockedNumbersCount = async () : Promise<number> => {
  const blockedNumbers = await kalleoAppServer.find('blockedNumbers');

  return blockedNumbers.length;
};

export const getFlaggedSpamCount = async () : Promise<number> => {
  const flaggedSpam = await kalleoAppServer.find('flaggedSpam');

  return flaggedSpam.length;
};
