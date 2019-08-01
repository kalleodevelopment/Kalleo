import RNSegmentIOAnalytics from 'react-native-segment-io-analytics';
import { Platform } from 'react-native';
import { isEmpty } from 'lodash';
import updateSubscriber from '../../actions/subscriber';
import validateEmail from '../../../helpers/validateEmail';

const updateCallerId = ({ mutate }) => (
  async (dispatch, getState) => {
    const {
      callerIdForm: {
        firstName,
        lastName,
        email,
      },
      subscriber: {
        _id: subscriberId,
      },
    } = getState();

    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email)) {
      throw new Error('Please fill out all fields.');
    }

    if (!validateEmail(email)) {
      throw new Error('Please input a valid email address.');
    }

    try {
      const result = await mutate({
        variables: {
          input: {
            firstName,
            lastName,
            email,
          },
        },
      });

      const { updateCallerId: subscriber } = result.data;

      if (Platform.OS === 'ios') {
        RNSegmentIOAnalytics.identifyUser(subscriberId, subscriber);
      }

      dispatch(updateSubscriber(subscriber));

      return subscriber;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export default updateCallerId;
