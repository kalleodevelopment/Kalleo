import Listing from '../models/Listing';

const upsertListing = ({ phoneNumber }, update) => (
  Listing.findOneAndUpdate({
    phoneNumber,
  },
  update,
  {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  })
    .lean()
    .exec()
);

export default upsertListing;
