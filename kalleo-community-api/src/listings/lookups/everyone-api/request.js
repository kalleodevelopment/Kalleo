import request from 'request-promise';
import { EVERYONE_API_ACCOUNT_SID, EVERYONE_API_AUTH_TOKEN } from '../../../config';

const everyoneApiRequest = (phoneNumber, dataFields = []) => {
  const usernameAndPassword = `${EVERYONE_API_ACCOUNT_SID}:${EVERYONE_API_AUTH_TOKEN}`;

  return request({
    uri: `https://api.everyoneapi.com/v1/phone/${phoneNumber}?data=${dataFields.join(',')}`,
    method: 'GET',
    headers: {
      Authorization: `Basic ${new Buffer(usernameAndPassword).toString('base64')}`,
    },
    json: true,
  });
};

export default everyoneApiRequest;
