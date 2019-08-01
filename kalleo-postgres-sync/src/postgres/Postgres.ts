import { Client } from 'pg';
import { without } from 'lodash';
import { Logger, to } from '../logging';
import { POSTGRES_DATABASE_URL } from '../config';

class Postgres {
  private client: Client;
  private log: any;

  constructor() {
    this.log = Logger('postgres');
  }

  async connect() {
    this.client = new Client({
      connectionString: POSTGRES_DATABASE_URL,
      ssl: true,
    });

    const [error] = await to(this.client.connect());

    if (error) {
      throw error;
    }

    this.log.info('successfully connected to postgres database');
  }

  async end() {
    await this.client.end();

    this.log.info('disconnected from postgres database');
  }

  getColumnsToSet(columns) {
    const columnsToSet = columns.map(column => `${column} = Excluded.${column}`).join(', ');

    return `${columnsToSet}, updated_at = current_timestamp`;
  }

  async upsert({ table, columns, record, queryIdColumn, queryId }) {
    const values = columns.map((column, index) => `$${index + 1}`).join(', ');
    const columnsToSet = this.getColumnsToSet(without(columns, queryIdColumn));

    // tslint:disable
    const text = `INSERT INTO ${table}(${columns.join(', ')}) VALUES(${values}) ON CONFLICT (${queryIdColumn}) DO UPDATE SET ${columnsToSet}`;

    const [error] = await to(this.client.query({
      text,
      values: Object.values(record),
    }));

    if (error) {
      this.log.error(error.message);
    }
  }

  async update({ table, column, selectorColumn, selector, value }) {
    const text = `UPDATE ${table} SET ${column} = ($1) WHERE ${selectorColumn} = ($2)`;
    const values = [value, selector];

    const [error] = await to(this.client.query({
      text,
      values,
    }));

    if (error) {
      this.log.error(error.message);
    }
  }
}

export default Postgres;
