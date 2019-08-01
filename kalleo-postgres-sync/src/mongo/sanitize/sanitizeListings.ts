import { Listing } from '../typings';

const sanitizeListings = (listings: Listing[]) : any => (
  listings.map(({ _id, isRegistered, lineType, type }) => ({
    lineType,
    isRegistered,
    type,
    listingId: _id,
  }))
);

export default sanitizeListings;
