import sendAuthCode from './sendAuthCode';
import verifyAuthCode from './verifyAuthCode';
import generateTwilioAccessToken from './generateTwilioAccessToken';
import guardSubscriber from '../../helpers/guardSubscriber';

export default {
  sendAuthCode,
  verifyAuthCode,
  generateTwilioAccessToken: guardSubscriber(generateTwilioAccessToken),
};
