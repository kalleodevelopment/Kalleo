import {
  callStatuses,
  listingTypes,
  subscriberRelations as relations,
} from '../../../db';

const determineCallStatus = ({ listingType, subscriberRelations }) => {
  let status;

  if (
    listingType === listingTypes.SPAM ||
    subscriberRelations.includes(relations.BLOCKED_NUMBER) ||
    subscriberRelations.includes(relations.FLAGGED_SPAM)
  ) {
    status = callStatuses.BLOCKED;
  } else if (listingType === listingTypes.UNIDENTIFIED) {
    status = callStatuses.DIRECT_TO_VOICEMAIL;
  } else {
    status = callStatuses.DIALED;
  }

  return status;
};

export default determineCallStatus;
