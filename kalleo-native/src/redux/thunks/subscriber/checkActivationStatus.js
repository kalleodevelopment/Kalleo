import Config from 'react-native-config';
import { updateVerificationResults } from '../../actions/verification';
import { activationStatuses } from '../../../constants/statuses';
import showAlertDialog from '../../../helpers/showAlertDialog';

export default ({ activationStatus: updatedActivationStatus }) => (
  async (dispatch, getState) => {
    const { subscriber: { activationStatus } } = getState();

    if (activationStatus === activationStatuses.VERIFICATION_INITIATED) {
      const verificationFailed = updatedActivationStatus === activationStatuses.FAILED;
      const verificationSuccessful = updatedActivationStatus === activationStatuses.VERIFIED;

      if (verificationSuccessful) {
        const { APP_NAME } = Config;

        showAlertDialog({
          title: 'Success',
          message: `Congratulations! You have successfully activated ${APP_NAME}.`,
        });
      }

      dispatch(updateVerificationResults(verificationFailed, verificationSuccessful));
    }
  }
);
