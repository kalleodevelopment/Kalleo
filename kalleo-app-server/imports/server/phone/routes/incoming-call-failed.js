import { logError } from '../../logging';

const handleIncomingCallFailed = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end();

  const { CallSid } = request.body;
  const twilioCallLogUrl = `https://www.twilio.com/console/voice/logs/calls/${CallSid}`;

  logError({
    request,
    message: `phone (incoming-call-failed): ${twilioCallLogUrl}`,
  });
};

export default handleIncomingCallFailed;
