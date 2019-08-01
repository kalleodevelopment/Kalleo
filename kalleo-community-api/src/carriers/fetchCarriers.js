import csvParse from 'csv-parse/lib/sync';
import request from 'request-promise';
import { CARRIERS_CSV_URL } from '../config';

const fetchCarriers = async () => {
  const csv = await request({
    uri: CARRIERS_CSV_URL,
    method: 'GET',
  });

  const carriers = csvParse(csv, {
    columns: true,
  });

  return carriers;
};

export default fetchCarriers;
