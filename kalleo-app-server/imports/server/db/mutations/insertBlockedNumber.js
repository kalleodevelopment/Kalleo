import BlockedNumber from '../models/BlockedNumber';

const insertBlockedNumber = ({
  callerIdName,
  phoneNumber,
  subscriberId,
}) => (
  new BlockedNumber({
    callerIdName,
    phoneNumber,
    subscriberId,
  }).save()
);

export default insertBlockedNumber;
