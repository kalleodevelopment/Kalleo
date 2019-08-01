import createOutgoingCall from './createOutgoingCall';
import guardSubscriber from '../../helpers/guardSubscriber';

export default {
  createOutgoingCall: guardSubscriber(createOutgoingCall),
};
