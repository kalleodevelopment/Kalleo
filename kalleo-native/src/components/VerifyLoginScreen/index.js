import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import RNSegmentIOAnalytics from 'react-native-segment-io-analytics';
import PropTypes from 'prop-types';
import VerifyLoginInput from '../VerifyLoginInput';
import RequestNewSMSCodeContainer from '../../containers/RequestNewSMSCodeContainer';
import DismissKeyboardHOC from '../DismissKeyboardHOC';
import KalleoText from '../KalleoText';
import ActionButton from '../ActionButton';
import KalleoTextTouchable from '../KalleoTextTouchable';
import { anonymousRoutes, onboardRoutes } from '../../constants/routes';
import { handleError, to } from '../../helpers/handleError';
import { verifyAuthCodeMutation } from '../../graphql/mutations';
import { mapDispatchToProps, mapStateToProps } from './redux';
import styles from './styles';

@graphql(verifyAuthCodeMutation)
@connect(mapStateToProps, mapDispatchToProps)
class VerifyLoginScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    phoneNumber: PropTypes.string.isRequired,
    verificationCode: PropTypes.arrayOf(PropTypes.string).isRequired,
    resetAuth: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.verifyValidPhoneNumber();
  }

  componentDidUpdate = () => {
    this.verifyValidPhoneNumber();
  }

  verifyValidPhoneNumber = () => {
    const {
      navigation: {
        navigate,
      },
      isAuthenticated,
      phoneNumber,
    } = this.props;

    if (!phoneNumber && !isAuthenticated) {
      navigate(anonymousRoutes.WELCOME_SCREEN);
    }
  }

  verifySMSCode = async () => {
    const { navigation: { navigate }, verifySMSCode, ...props } = this.props;

    const [error, subscriber] = await to(verifySMSCode(props));

    if (!error) {
      if (Platform.OS === 'ios') {
        // eslint-disable-next-line no-underscore-dangle
        RNSegmentIOAnalytics.identifyUser(subscriber._id, {
          phoneNumber: subscriber.phoneNumber,
        });
      }

      navigate(onboardRoutes.VALUE_PROPS_SCREEN);
    } else {
      handleError(error);
    }
  }

  goBack = () => {
    const { resetAuth } = this.props;

    resetAuth();
  }

  render = () => {
    const { verificationCode, phoneNumber } = this.props;

    const isDisabled = verificationCode.includes(null);

    return (
      <View style={styles.container}>
        <KalleoText
          styles={styles.header}
          text="Enter the verification code sent to you via SMS text."
        />
        <VerifyLoginInput />
        <View style={styles.verifyCodeSentWrapper}>
          <KalleoText
            styles={styles.text}
            text="Code sent to "
          />
          <KalleoText
            styles={styles.phoneNumber}
            text={phoneNumber}
          />
        </View>
        <RequestNewSMSCodeContainer />
        <View style={styles.wrongNumberWrapper}>
          <KalleoText
            styles={styles.text}
            text="Wrong number?"
          />
          <KalleoTextTouchable
            onPress={this.goBack}
            textStyles={styles.goBack}
            text="Go back."
          />
        </View>
        <ActionButton
          isDisabled={isDisabled}
          onPress={this.verifySMSCode}
          title="Continue"
        />
      </View>
    );
  }
}

export default DismissKeyboardHOC(VerifyLoginScreen, { containerType: 'flexCenterColumn' });
