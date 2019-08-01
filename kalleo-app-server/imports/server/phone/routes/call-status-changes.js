import sendPushNotification from '../twilio/notify/sendPushNotification';
import sendText from '../twilio/sendText';
import { pushNotificationMessages, textMessages } from '../../content';
import { callStatuses, findCall, updateCall } from '../../db';
import { publishInsertedCall } from '../../graphql/publications';
import { logError } from '../../logging';
import isMobileLineType from '../helpers/isMobileLineType';

const handleCallStatusChanges = async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end();

  const {
    CallSid: incomingCallSid,
    CallStatus,
  } = request.body;

  try {
    if (CallStatus === 'completed') {
      const call = await findCall({ incomingCallSid });

      // If the call status is still "DIALED", the /dial-call-status route was never hit.
      // That means the caller hung up before the client was dialed, and we will treat
      // this as a missed call.
      if (call && call.status === callStatuses.DIALED) {
        const {
          _id,
          callerIdName,
          lineType,
          phoneNumber,
          subscriberId,
        } = call;

        const completedCall = await updateCall({
          _id,
        }, {
          status: callStatuses.MISSED,
        });

        publishInsertedCall(completedCall);

        await sendPushNotification({
          subscriberId,
          body: pushNotificationMessages.MISSED_CALL(callerIdName),
        });

        if (isMobileLineType(lineType)) {
          sendText(phoneNumber, textMessages.UNREGISTERED_CALL(callerIdName));
        }
      }
    }
  } catch (error) {
    logError({ error, request });
  }
};

export default handleCallStatusChanges;
