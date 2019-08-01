import { stringify } from 'querystring';
import twilio from 'twilio';
import routePaths from '../../constants/routePaths';
import generateIdentity from '../../helpers/generateIdentity';
import toTwilioCallerId from '../../helpers/toTwilioCallerId';
import {
  DIAL_TIMEOUT_SECONDS,
  GATHER_TIMEOUT_SECONDS,
  ROOT_URL,
  VOICEMAIL_MAX_SECONDS,
} from '../../../config';

class VoiceResponse {
  constructor() {
    this.voiceResponse = new twilio.twiml.VoiceResponse();
  }

  play(audioUrl) {
    this.voiceResponse.play(audioUrl);

    return this;
  }

  say(message) {
    this.voiceResponse.say({ voice: 'woman' }, message);

    return this;
  }

  hangup() {
    this.voiceResponse.hangup();

    return this;
  }

  reject() {
    // TODO: Figure out a way to use reason: 'rejected' without redial
    this.voiceResponse.reject({ reason: 'busy' });

    return this;
  }

  redirect(url) {
    this.voiceResponse.redirect(url);
  }

  dialClient({
    callerIdName,
    callId,
    callerIsRegistered,
    phoneNumber,
    subscriberId,
  }) {
    const queryParams = stringify({
      callerIsRegistered,
      callerIdName: callerIdName || phoneNumber,
      callId: callId ? String(callId) : null,
      subscriberId: subscriberId.toString(),
    });

    const dialCallStatusUrl = `${ROOT_URL}${routePaths.DIAL_CALL_STATUS}?${queryParams}`;

    const dial = this.voiceResponse.dial({
      action: dialCallStatusUrl,
      callerId: callerIdName ? toTwilioCallerId(callerIdName) : phoneNumber,
      timeout: DIAL_TIMEOUT_SECONDS,
    });

    dial.client(generateIdentity(subscriberId));

    return this;
  }

  gather({ callId }) {
    const queryParams = stringify({
      callId: callId ? String(callId) : null,
    });

    this.voiceResponse.gather({
      action: `${routePaths.GATHER_PHONE_NUMBER}?${queryParams}`,
      finishOnKey: '#',
      input: 'dtmf',
      numDigits: 10,
      timeout: GATHER_TIMEOUT_SECONDS,
    });

    this.redirect(`${routePaths.GATHER_PHONE_NUMBER_TIMEOUT}?${queryParams}`);

    return this;
  }

  recordVoicemail({ voicemailMessage, subscriberId }) {
    const queryParams = stringify({
      subscriberId: subscriberId ? String(subscriberId) : null,
    });

    this.play(voicemailMessage);

    this.voiceResponse.record({
      action: `${routePaths.VOICEMAIL}?${queryParams}`,
      method: 'POST',
      maxLength: VOICEMAIL_MAX_SECONDS,
      finishOnKey: '#',
    });

    this.hangup();

    return this;
  }

  toTwiml() {
    return this.voiceResponse.toString();
  }
}

export const hangup = () => new VoiceResponse().hangup().toTwiml();
export const play = audioUrl => new VoiceResponse().play(audioUrl).toTwiml();
export const reject = () => new VoiceResponse().reject().toTwiml();

export default VoiceResponse;
