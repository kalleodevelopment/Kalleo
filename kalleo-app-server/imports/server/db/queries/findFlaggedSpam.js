import FlaggedSpam from '../models/FlaggedSpam';

const findFlaggedSpam = ({ subscriberId, phoneNumber }) => (
  FlaggedSpam.findOne({
    subscriberId,
    phoneNumber,
  })
    .lean()
    .exec()
);

export default findFlaggedSpam;
