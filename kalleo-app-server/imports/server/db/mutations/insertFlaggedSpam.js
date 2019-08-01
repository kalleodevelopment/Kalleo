import FlaggedSpam from '../models/FlaggedSpam';

const insertFlaggedSpam = ({
  callerIdName,
  phoneNumber,
  subscriberId,
  type,
}) => (
  new FlaggedSpam({
    callerIdName,
    phoneNumber,
    subscriberId,
    type,
  }).save()
);

export default insertFlaggedSpam;
