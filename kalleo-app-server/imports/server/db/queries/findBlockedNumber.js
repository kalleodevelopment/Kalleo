import BlockedNumber from '../models/BlockedNumber';

const findBlockedNumber = ({ subscriberId, phoneNumber }) => (
  BlockedNumber.findOne({
    subscriberId,
    phoneNumber,
  })
    .lean()
    .exec()
);

export default findBlockedNumber;
