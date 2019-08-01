import createCall from '../twilio/createCall';
import {
  TWILIO_TEST_CALL_FROM_PHONE_NUMBER,
  TWILIO_TEST_CALL_TO_PHONE_NUMBER,
} from '../../config';

const handleTestCall = async (request, response) => {
  await createCall({
    url: 'https://demo.twilio.com/welcome/voice/',
    to: TWILIO_TEST_CALL_TO_PHONE_NUMBER,
    from: TWILIO_TEST_CALL_FROM_PHONE_NUMBER,
  });

  response.writeHead(200);
  response.end();
};

export default handleTestCall;
