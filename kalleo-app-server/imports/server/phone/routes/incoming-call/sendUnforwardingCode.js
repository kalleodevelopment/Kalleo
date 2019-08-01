import sendText from '../../twilio/sendText';
import { carrierLookup } from '../../../community';
import { textMessages } from '../../../content';

const sendUnforwardingCode = async ({ phoneNumber, carrierId }) => {
  const { unforwardingCode } = await carrierLookup(carrierId);

  // TODO: Change message
  await sendText(phoneNumber, textMessages.ACCOUNT_DISABLED(`tel://${unforwardingCode}`));
};

export default sendUnforwardingCode;
