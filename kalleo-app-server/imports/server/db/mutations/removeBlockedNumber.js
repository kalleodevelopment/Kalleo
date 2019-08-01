import BlockedNumber from '../models/BlockedNumber';

const removeBlockedNumber = ({ subscriberId, phoneNumber }) => (
  BlockedNumber.findOneAndRemove({ subscriberId, phoneNumber })
    .lean()
    .exec()
);

export default removeBlockedNumber;
