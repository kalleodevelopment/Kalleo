import identifyCaller from './identifyCaller';
import notifySubscriber from './notifySubscriber';
import respondToIdentifiedCaller from './respondToIdentifiedCaller';
import gatherSubscriberPhoneNumber from './gatherSubscriberPhoneNumber';
import determineCallStatus from './determineCallStatus';
import handleVerificationCall from '../../activation-deactivation/verification/handleVerificationCall';
import { play, reject } from '../../twilio/twiml/VoiceResponse';
import { recordingUrls } from '../../../content';
import { callTypes, findSubscriber, findSubscriberRelations, insertCall } from '../../../db';
import twilioSipToCallSip from '../../helpers/twilioSipToCallSip';
import { logError } from '../../../logging';
import { TWILIO_VERIFICATION_PHONE_NUMBER } from '../../../config';

const handleIncomingCall = async (request, response) => {
  const {
    Caller: caller,
    CallSid: incomingCallSid,
    ForwardedFrom: subscriberForwardedFrom,
  } = request.body;

  let callResponse;
  let callDoc;

  const identifiedCaller = await identifyCaller({ phoneNumber: caller });
  const callerSip = twilioSipToCallSip(request.body);

  const newCall = {
    ...identifiedCaller,
    ...callerSip,
    incomingCallSid,
    type: callTypes.INCOMING,
  };

  try {
    if (!subscriberForwardedFrom) {
      callResponse = await gatherSubscriberPhoneNumber(newCall);
    } else {
      const subscriber = await findSubscriber({ phoneNumber: subscriberForwardedFrom });

      if (caller === TWILIO_VERIFICATION_PHONE_NUMBER) {
        await handleVerificationCall(subscriber);

        callResponse = reject();
      } else {
        const { _id: subscriberId } = subscriber;

        const subscriberRelations = await findSubscriberRelations({
          subscriberId,
          phoneNumber: caller,
        });

        const status = determineCallStatus({
          ...identifiedCaller,
          subscriberRelations,
        });

        callDoc = await insertCall({
          ...newCall,
          status,
          subscriberForwardedFrom,
          subscriberId,
          subscriberRelations,
        });

        callResponse = await respondToIdentifiedCaller({
          callDoc,
          identifiedCaller,
        });
      }
    }
  } catch (error) {
    logError({ error, request });

    callResponse = play(recordingUrls.ERROR);
  }

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(callResponse);

  if (callDoc && identifiedCaller) {
    await notifySubscriber({
      callDoc,
      identifiedCaller,
    });
  }
};

export default handleIncomingCall;
