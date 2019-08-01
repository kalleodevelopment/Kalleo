import to from 'await-to-js';
import determineCallStatus from './determineCallStatus';
import twilioSipToCallSip from '../../helpers/twilioSipToCallSip';
import { callTypes, insertCall } from '../../../db';
import { logError } from '../../../logging';

const insertCallDoc = async ({
  identifiedCaller,
  incomingCallSid,
  subscriberForwardedFrom,
  subscriberId,
  twilioSip,
}) => {
  const callSip = twilioSipToCallSip(twilioSip);

  const call = {
    ...identifiedCaller,
    ...callSip,
    incomingCallSid,
    subscriberForwardedFrom,
    subscriberId,
    status: determineCallStatus(identifiedCaller),
    type: callTypes.INCOMING,
  };

  const [error, callDoc] = await to(insertCall(call));

  if (error) {
    logError({ error });

    return call;
  }

  return callDoc;
};

export default insertCallDoc;
