import BlockedNumber from '../models/BlockedNumber';

// TODO: Add skip and limit
const findBlockedNumbers = ({ subscriberId }, projection, options) => (
  BlockedNumber.find(
    { subscriberId },
    projection,
    options,
  )
    .lean()
    .exec()
);

export default findBlockedNumbers;
