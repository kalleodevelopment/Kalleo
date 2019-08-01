import sendSubscriberFeedback from '../../../redux/thunks/subscriberFeedback';
import { updateSubscriberFeedback } from '../../../redux/actions/subscriberFeedback';
import updateIsLoading from '../../../redux/actions/isLoading';

export default dispatch => ({
  sendSubscriberFeedback: props => dispatch(sendSubscriberFeedback(props)),

  updateIsLoading: isLoading => dispatch(updateIsLoading(isLoading)),

  updateSubscriberFeedback: subscriberFeedback => (
    dispatch(updateSubscriberFeedback(subscriberFeedback))
  ),
});
