import csvParse from 'csv-parse/lib/sync';
import request from 'request-promise';
import { KalleoCarrier } from './typings';
import { CARRIER_URL } from '../config';

class Carrier {
  private uri: string = CARRIER_URL;
  private carriers: KalleoCarrier[];

  async fetch() {
    const csv = await request({
      uri: this.uri,
      method: 'GET',
    });

    const carriers = csvParse(csv, {
      columns: true,
    });

    this.carriers = carriers;
  }

  findById(id: number) : KalleoCarrier {
    return this.carriers.find(c => (Number(c.id) === id));
  }
}

export default Carrier;
