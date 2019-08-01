import FlaggedSpam from '../models/FlaggedSpam';

const removeFlaggedSpam = ({ subscriberId, phoneNumber }) => (
  FlaggedSpam.findOneAndRemove({ subscriberId, phoneNumber })
    .lean()
    .exec()
);

export default removeFlaggedSpam;
