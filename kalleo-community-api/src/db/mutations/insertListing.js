import Listing from '../models/Listing';
import { logMessage } from '../../logging';

const insertListing = async (listing) => {
  logMessage({ message: 'db (insertListing): Insert listing' });

  const insertedListing = await new Listing(listing).save();

  logMessage({ message: 'db (insertListing): Listing created' });

  return insertedListing;
};

export default insertListing;
