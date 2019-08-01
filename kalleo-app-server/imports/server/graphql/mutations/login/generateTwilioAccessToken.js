import { jwt } from 'twilio';
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
  TWILIO_VOIP_SID_IOS,
  TWILIO_VOIP_SID_ANDROID,
} from '../../../config';
import { generateIdentity } from '../../../phone';

const devicePushSids = {
  ios: TWILIO_VOIP_SID_IOS,
  android: TWILIO_VOIP_SID_ANDROID,
};

const { AccessToken } = jwt;
const { VoiceGrant } = AccessToken;

const generateTwilioAccessToken = async (obj, { device }, { subscriber }) => {
  const pushCredentialSid = devicePushSids[device];
  const voiceGrant = new VoiceGrant({ pushCredentialSid });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET);

  token.addGrant(voiceGrant);
  token.identity = generateIdentity(subscriber._id); // eslint-disable-line no-underscore-dangle

  return token.toJwt();
};

export default generateTwilioAccessToken;
