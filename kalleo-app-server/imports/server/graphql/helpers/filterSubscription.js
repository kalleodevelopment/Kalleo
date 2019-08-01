import jwt from 'jwt-simple';
import { JWT_SECRET } from '../../config';

const filterSubscription = (subscriberId, authToken) => {
  if (!subscriberId || !authToken) {
    return false;
  }

  const { _id } = jwt.decode(authToken, JWT_SECRET);

  return subscriberId === _id;
};

export default filterSubscription;
