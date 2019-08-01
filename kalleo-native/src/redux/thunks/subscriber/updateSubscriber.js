import deepEqual from 'deep-equal';
import { pick } from 'lodash';
import { updateCallerIdFormFields } from '../../actions/caller-id-form';
import updateSubscriber from '../../actions/subscriber';
import { callerIdFormFields } from '../../../constants';

export default subscriber => (
  async (dispatch, getState) => {
    const { callerIdForm } = getState();
    const subscriberCallerIdFormFields = pick(subscriber, callerIdFormFields);

    dispatch(updateSubscriber(subscriber));

    if (!deepEqual(callerIdForm, subscriberCallerIdFormFields)) {
      dispatch(updateCallerIdFormFields(subscriberCallerIdFormFields));
    }
  }
);
