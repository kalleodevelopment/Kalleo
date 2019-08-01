import { Client } from 'pg';
import { to, Logger } from '../logging';
import { POSTGRES_DATABASE_URL } from '../config';

const log = Logger('postgres:connectToPostgresDb');

const connectToDb = async () : Promise<Client> => {
  const client = new Client({
    connectionString: POSTGRES_DATABASE_URL,
    ssl: true,
  });

  const [error] = await to(client.connect());

  if (error) {
    log.error(error.message);
  }

  log.info('successfull conneccted to Postgres database');

  return client;
};

export default connectToDb;
