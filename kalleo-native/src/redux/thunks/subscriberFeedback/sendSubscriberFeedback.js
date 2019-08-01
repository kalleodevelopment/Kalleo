import to from 'await-to-js';
import { resetSubscriberFeedback } from '../../actions/subscriberFeedback';

export default ({ mutate }) => (
  async (dispatch, getState) => {
    const { subscriberFeedback } = getState();

    if (!subscriberFeedback) {
      throw new Error('Please add feedback.');
    }

    const [error, result] = await to(mutate({
      variables: {
        text: subscriberFeedback,
      },
    }));

    if (!error) {
      dispatch(resetSubscriberFeedback());

      return result;
    }

    throw error;
  }
);
