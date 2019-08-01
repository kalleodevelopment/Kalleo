import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import ActivationHeader from '../ActivationHeader';
import DeactivationHeader from '../DeactivationHeader';
import ActivationDeactivationSteps from '../ActivationDeactivationSteps';
import ActionButton from '../ActionButton';
import VerificationOverylay from '../VerificationOverlay';
import { activationStatuses, deactivationStatuses } from '../../constants/statuses';
import { onboardRoutes, settingsRoutes } from '../../constants/routes';
import { getStackNavigationOptions } from '../../helpers/navigation';
import checkIfDeactivationWasSuccessful from '../../helpers/checkIfDeactivationWasSuccessful';
import { handleError, to } from '../../helpers/handleError';
import showAlertDialog from '../../helpers/showAlertDialog';
import { initiateVerificationMutation } from '../../graphql/mutations';
import { mapStateToProps, mapDispatchToProps } from './redux';
import styles from './styles';

@graphql(initiateVerificationMutation)
@connect(mapStateToProps, mapDispatchToProps)
class ActivationDeactivation extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    if (params && params.title) {
      return getStackNavigationOptions({ title: params.title });
    }

    return null;
  }

  static propTypes = {
    activeRoute: PropTypes.shape({
      routeName: PropTypes.string,
    }),
    activationStatus: PropTypes.oneOf(Object.keys(activationStatuses)).isRequired,
    deactivationStatus: PropTypes.oneOf(Object.keys(deactivationStatuses)).isRequired,
    subscriberIsDeactivated: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    showVerificationOverlay: PropTypes.bool.isRequired,
    updateShowVerificationOverlay: PropTypes.func.isRequired,
    updateVerificationFailed: PropTypes.func.isRequired,
    verificationFailed: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    activeRoute: {},
  }

  componentDidMount = () => {
    const { verificationFailed } = this.props;

    if (verificationFailed) {
      this.showFailedAlert();
    }
  }

  componentDidUpdate = (prevProps) => {
    const { activeRoute, navigation: { goBack }, verificationFailed } = this.props;

    if (
      verificationFailed
      && (activeRoute.routeName === settingsRoutes.ACTIVATION_DEACTIVATION_SCREEN)
    ) {
      this.showFailedAlert();
    } else if (checkIfDeactivationWasSuccessful(prevProps, this.props)) {
      const { APP_NAME } = Config;

      showAlertDialog({
        title: 'Success',
        message: `You have successfully deactivated ${APP_NAME}.`,
        buttons: [{
          text: 'Ok',
          onPress: goBack,
        }],
      });
    }
  }

  onPress = async () => {
    const {
      deactivationStatus,
      subscriberIsDeactivated,
      navigation: {
        navigate,
      },
      mutate,
      updateShowVerificationOverlay,
    } = this.props;

    if (subscriberIsDeactivated) {
      // TODO: We need to handle this better
      if (deactivationStatus === 'VERIFIED') {
        navigate(settingsRoutes.SETTINGS_VERIFY_ACTIVATION_SCREEN);
      } else {
        navigate(onboardRoutes.ONBOARD_VERIFY_ACTIVATION_SCREEN);
      }
    } else {
      const [error] = await to(mutate({
        variables: {
          type: 'DEACTIVATION',
        },
      }));

      if (!error) {
        updateShowVerificationOverlay(true);
      } else {
        handleError(error);
      }
    }
  }

  isButtonDisabled = () => {
    const { activationStatus, deactivationStatus, subscriberIsDeactivated } = this.props;

    let statusToCheck = deactivationStatus;
    let statusesToCheck = deactivationStatuses;

    if (subscriberIsDeactivated) {
      statusToCheck = activationStatus;
      statusesToCheck = activationStatuses;
    }

    switch (statusToCheck) {
      case statusesToCheck.CALL_INITIATED:
      case statusesToCheck.FAILED:
        return false;
      default:
        return true;
    }
  }

  showFailedAlert = () => {
    const { subscriberIsDeactivated, updateVerificationFailed } = this.props;

    const message = `${subscriberIsDeactivated ? 'Activation' : 'Deactivation'} failed, please try again.`;

    showAlertDialog({
      message,
      title: 'Error',
      buttons: [{
        text: 'Ok',
        onPress: () => updateVerificationFailed(false),
      }],
    });
  }

  showVerificationOverlay = () => <VerificationOverylay />

  render = () => {
    const { subscriberIsDeactivated, showVerificationOverlay } = this.props;
    const { activationButtonContainer, deactivationButtonContainer } = styles;

    return (
      <View style={styles.container}>
        {subscriberIsDeactivated ? <ActivationHeader /> : <DeactivationHeader />}
        <ActivationDeactivationSteps subscriberIsDeactivated={subscriberIsDeactivated} />
        <ActionButton
          isDisabled={this.isButtonDisabled()}
          buttonContainerStyles={
            !subscriberIsDeactivated && !this.isButtonDisabled()
              ? deactivationButtonContainer
              : activationButtonContainer
          }
          onPress={this.onPress}
          title={subscriberIsDeactivated ? 'Verify' : 'Confirm Deactivation'}
        />
        {showVerificationOverlay ? this.showVerificationOverlay() : null}
      </View>
    );
  }
}

export default ActivationDeactivation;
