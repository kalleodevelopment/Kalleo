import initiateActivationCall from './initiateActivationCall';
import initiateDeactivationCall from './initiateDeactivationCall';
import sendDeactivationText from './sendDeactivationText';
import initiateVerification from './initiateVerification';
import sendActivationText from './sendActivationText';
import guardSubscriber from '../../helpers/guardSubscriber';

export default {
  initiateActivationCall: guardSubscriber(initiateActivationCall),
  initiateDeactivationCall: guardSubscriber(initiateDeactivationCall),
  initiateVerification: guardSubscriber(initiateVerification),
  sendActivationText: guardSubscriber(sendActivationText),
  sendDeactivationText: guardSubscriber(sendDeactivationText),
};
