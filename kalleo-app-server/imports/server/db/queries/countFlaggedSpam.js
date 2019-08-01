import FlaggedSpam from '../models/FlaggedSpam';

const countFlaggedSpam = ({ phoneNumber }) => (
  FlaggedSpam.find({ phoneNumber }).count()
);

export default countFlaggedSpam;
