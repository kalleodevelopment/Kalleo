import twilioClient from '../client';
import {
  TWILIO_PUSH_NOTIFICATION_SID_ANDROID,
  TWILIO_PUSH_NOTIFICATION_SID_IOS,
} from '../../../config';

export default {
  android: twilioClient.notify.services(TWILIO_PUSH_NOTIFICATION_SID_ANDROID),
  ios: twilioClient.notify.services(TWILIO_PUSH_NOTIFICATION_SID_IOS),
};
