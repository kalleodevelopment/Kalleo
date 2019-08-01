import { MongoClient, Db } from 'mongodb';
import { Logger, to } from '../logging';

class Mongo {
  readonly databaseName: string;
  readonly uri: string;

  private client: MongoClient;
  private db: Db;
  private log: any;

  constructor(uri: string, databaseName: string) {
    this.log = Logger('mongo');

    this.databaseName = databaseName;
    this.uri = uri;
  }

  async connect() : Promise<void> {
    const [error, client] = await to(MongoClient.connect(this.uri));

    if (error) throw error;

    this.client = client;
    this.db = this.client.db(this.databaseName);

    this.log.info(`successfully connected to ${this.databaseName} mongo database`);
  }

  close() : void {
    this.client.close();

    this.log.info(`disconnected from ${this.databaseName} mongo database`);
  }

  async find(name: string, conditions?: any) : Promise<any> {
    const collection = this.db.collection(name);

    const [error, documents] = await to(collection.find(
      conditions,
    ).toArray());

    if (error) throw error;

    this.log.info(`${documents.length} total ${name} found`);

    return Object.values(documents);
  }
}

export default Mongo;
