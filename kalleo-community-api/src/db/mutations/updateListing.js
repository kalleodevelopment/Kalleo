import Listing from '../models/Listing';

const updateListing = ({ phoneNumber }, update) => (
  Listing.findOneAndUpdate({
    phoneNumber,
  },
  update,
  {
    new: true,
    setDefaultsOnInsert: true,
  })
    .lean()
    .exec()
);

export default updateListing;
