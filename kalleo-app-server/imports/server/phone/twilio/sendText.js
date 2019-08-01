import twilioClient from './client';
import { TWILIO_SMS_PHONE_NUMBER } from '../../config';

const sendText = (phoneNumber, message) => (
  twilioClient.messages.create({
    body: message,
    to: phoneNumber,
    from: TWILIO_SMS_PHONE_NUMBER,
  })
);

export default sendText;
