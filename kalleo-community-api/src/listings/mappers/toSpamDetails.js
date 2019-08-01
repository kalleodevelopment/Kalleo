import { reputationCategories } from '../../db';

const toSpamDetails = ({
  volume_score: volumeScore,
  report_count: reportCount,
  reputation_details: {
    type,
    category,
    score,
  },
  reputation_level: level,
}) => ({
  spamDetails: {
    volumeScore,
    reportCount,
    reputation: {
      level,
      score,
      type,
      category: category || reputationCategories.Unknown,
    },
  },
});

export default toSpamDetails;
