import jwt from 'jwt-simple';
import { JWT_SECRET } from '../../config';
import { findSubscriber } from '../../db';

const onSubscriptionOperation = async ({ payload }, params) => {
  const { authToken } = payload;

  if (!authToken) {
    throw new Error('Missing auth token');
  }

  const { _id } = jwt.decode(authToken, JWT_SECRET);
  const subscriber = await findSubscriber({ _id });

  if (!subscriber) {
    throw new Error('No subscriber found');
  }

  return params;
};

export default onSubscriptionOperation;
