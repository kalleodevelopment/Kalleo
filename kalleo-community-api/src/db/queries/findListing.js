import Listing from '../models/Listing';
import { logMessage } from '../../logging';

const findListing = (conditions) => {
  logMessage({ message: 'db (findOne): Find Listing' });

  return Listing.findOne(conditions)
    .lean()
    .exec();
};

export default findListing;
