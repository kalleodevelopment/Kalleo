import twilio from './client';
import {
  TWILIO_WHITE_PAGES_REP_SID,
  TWILIO_WHITE_PAGES_REP_UNIQUE_NAME,
} from '../../../config';

const reputationLookup = async (phoneNumber) => {
  const { addOns } = await twilio
    .lookups
    .phoneNumbers(phoneNumber)
    .fetch({
      addOns: TWILIO_WHITE_PAGES_REP_UNIQUE_NAME,
      addOnsData: {
        [`${TWILIO_WHITE_PAGES_REP_UNIQUE_NAME}.AvailableAddOnSid`]: TWILIO_WHITE_PAGES_REP_SID,
      },
    });

  const reputation = addOns.results[TWILIO_WHITE_PAGES_REP_UNIQUE_NAME].result;

  return reputation;
};

export default reputationLookup;
