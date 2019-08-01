import { carrierLookup } from '../../../community';
import { AppError } from '../../../logging';

const getForwardingCode = async (subscriber) => {
  const { carrierId, forwardingPhoneNumber } = subscriber;

  const carrier = carrierId
    ? await carrierLookup(carrierId)
    : null;

  if (!carrierId || !carrier || !carrier.forwardingCode) {
    throw new AppError('Your carrier is not currently supported by kalleo');
  }

  const formattedForwardingPhoneNumber = forwardingPhoneNumber.replace('+', '');
  const forwardingCode = carrier.forwardingCode.replace('{{phoneNumber}}', formattedForwardingPhoneNumber);

  return forwardingCode;
};

export default getForwardingCode;
