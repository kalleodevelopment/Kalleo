import to from 'await-to-js';
import services from './services';
import findBinding from './findBinding';
import generateIdentity from '../../helpers/generateIdentity';
import { PUSH_NOTIFICATION_SOUND_FILENAME } from '../../../config';

const sendPushNotification = async ({ subscriberId, body }) => {
  const identity = generateIdentity(subscriberId);
  const androidBinding = await findBinding(identity, 'android');
  const iosBinding = await findBinding(identity, 'ios');

  let service;

  if (androidBinding) {
    service = services.android;
  } else if (iosBinding) {
    service = services.ios;
  }

  if (service) {
    const [error] = await to(service.notifications.create({
      identity,
      body,
      sound: PUSH_NOTIFICATION_SOUND_FILENAME,
    }));

    if (error) {
      throw new Error(`Unable to send push notification: ${error.message}`);
    }
  }
};

export default sendPushNotification;
