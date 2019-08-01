
import { appSchema, publicSchema } from './schemas';
import { KALLEO_MASTER_API_KEY } from '../../config';

const getAuthorizedSchema = (request) => {
  const { authorization = '' } = request.headers;
  const [type, credentials] = authorization.split(' ');

  if (KALLEO_MASTER_API_KEY && type === 'Basic' && credentials === KALLEO_MASTER_API_KEY) {
    return appSchema;
  }

  return publicSchema;
};

export default getAuthorizedSchema;
