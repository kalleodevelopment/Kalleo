import {
  closeMongoConnection,
  connectToMongo,
  findCalls,
  findListings,
  findSubscribers,
  getBlockedNumbersCount,
  getFlaggedSpamCount,
} from './mongo';
import { syncCounts, syncDocuments } from './postgres';
import { Logger } from './logging';

const log = Logger('start-kaleo-postges-sync');

const startKalleoPostgresSync = async (): Promise<void> => {
  log.info('starting kalleo postgres sync');

  await connectToMongo();

  const subscribers = await findSubscribers();
  const calls = await findCalls();
  const listings = await findListings();
  const blockedNumbersCount = await getBlockedNumbersCount();
  const flaggedSpamCount = await getFlaggedSpamCount();

  await closeMongoConnection();

  await syncDocuments({ calls, listings, subscribers });
  await syncCounts({ blockedNumbersCount, flaggedSpamCount });

  log.info('kalleo postgres sync finished');

  process.exit();
};

startKalleoPostgresSync().catch((error : Error) => {
  log.error(error.message);
});
