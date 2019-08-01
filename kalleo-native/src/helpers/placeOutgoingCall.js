import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import to from 'await-to-js';
import { getFormattedPhoneNumber } from './phone-numbers';
import phoneNumberFormats from '../constants/phoneNumberFormats';

export default async ({ mutate, phoneNumber }) => {
  RNImmediatePhoneCall.immediatePhoneCall(getFormattedPhoneNumber({
    value: phoneNumber,
    format: phoneNumberFormats.SIGNIFICANT,
    validateNumber: false,
  }));

  // We are not throwing any errors for creating an outgoing call
  await to(mutate({
    variables: {
      phoneNumber: getFormattedPhoneNumber({
        value: phoneNumber,
        validateNumber: false,
      }),
    },
  }));
};
