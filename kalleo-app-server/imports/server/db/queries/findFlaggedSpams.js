import FlaggedSpam from '../models/FlaggedSpam';

// TODO: Add skip and limit
const findFlaggedSpams = ({ subscriberId }, projection, options) => (
  FlaggedSpam.find(
    { subscriberId },
    projection,
    options,
  )
    .lean()
    .exec()
);

export default findFlaggedSpams;
