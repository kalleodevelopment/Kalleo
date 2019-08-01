import Twilio from 'twilio';
import { TWILIO_TEST_ACCOUNT_SID, TWILIO_TEST_AUTH_TOKEN } from '../../config';

const twilioTestClient = new Twilio(TWILIO_TEST_ACCOUNT_SID, TWILIO_TEST_AUTH_TOKEN);

export default twilioTestClient;
