import Postgres from './Postgres';
import { to } from '../logging';
import { callColumns, listingColumns, subscriberColumns } from './columns';
import { countKeys } from './constants';
import { POSTGRES_COUNTS_ID } from '../config';

const upsertData = async (postgres,{ documents, table, queryIdColumn, queryId, columns }) => {
  const promises = documents.map(async (document) => {
    const [error] = await to(postgres.upsert({
      table,
      queryIdColumn,
      columns: Object.values(columns),
      queryId: document[queryId],
      record: document,
    }));

    if (error) {
      console.log('error.message: ', error.message);
    }
  });

  await Promise.all(promises);

  return;
};

export const syncCounts = async (counts) => {
  const postgres = new Postgres();

  await postgres.connect();

  const promises = Object.keys(counts).map(async (key) => {
    const count = counts[key];
    const column = countKeys[key];

    await postgres.update({
      column,
      selector: POSTGRES_COUNTS_ID,
      selectorColumn: 'id',
      table: 'counts',
      value: count,
    });
  });

  await Promise.all(promises);

  await postgres.end();
};

export const syncDocuments = async ({ calls, listings, subscribers }) => {
  const postgres = new Postgres();

  await postgres.connect();

  await upsertData(postgres, {
    documents: subscribers,
    table: 'subscribers',
    queryIdColumn: 'subscriber_id',
    queryId: 'subscriberId',
    columns: subscriberColumns,
  });

  await upsertData(postgres, {
    documents: calls,
    table: 'calls',
    queryIdColumn: 'call_id',
    queryId: 'callId',
    columns: callColumns,
  });

  await upsertData(postgres, {
    documents: listings,
    table: 'listings',
    queryIdColumn: 'listing_id',
    queryId: 'listingId',
    columns: listingColumns,
  });

  await postgres.end();

  return true;
};
