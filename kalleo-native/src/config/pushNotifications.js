import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';
import to from 'await-to-js';
import { gql } from 'react-apollo';
import { Platform } from 'react-native';
import apolloClient from './apollo-client';

const { ANDROID_FIREBASE_SENDER_ID, PUSH_NOTIFICATION_SOUND_FILENAME } = Config;

PushNotification.configure({
  onRegister: async ({ token: deviceToken }) => {
    const schema = gql`
      mutation registerForPushNotifications($deviceToken: String!, $device: String!) {
        registerForPushNotifications(deviceToken: $deviceToken, device: $device)
      }
    `;

    const [error] = await to(apolloClient.mutate({
      mutation: schema,
      variables: {
        deviceToken,
        device: Platform.OS,
      },
    }));

    if (error) {
      throw new Error(`Unable to register binding for device: ${error.message}`);
    }
  },
  onNotification(notification) {
    const { id, twi_body } = notification;

    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        id,
        smallIcon: 'ic_notification',
        message: twi_body,
        soundName: PUSH_NOTIFICATION_SOUND_FILENAME,
      });
    }
  },
  senderID: ANDROID_FIREBASE_SENDER_ID,
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: false,
});
