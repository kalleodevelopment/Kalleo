import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import DismissKeyboardWithBackgroundImage from '../DismissKeyboardWithBackgroundImage';
import KalleoText from '../KalleoText';
import LoginPhoneInput from '../LoginPhoneInput';
import { anonymousRoutes } from '../../constants/routes';
import { handleError, to } from '../../helpers/handleError';
import { sendAuthCodeMutation } from '../../graphql/mutations';
import { mapStateToProps, mapDispatchToProps } from './redux';
import styles from './styles';

const backgroundImage = require('../../images/welcome-screen.png');

@graphql(sendAuthCodeMutation)
@connect(mapStateToProps, mapDispatchToProps)
class WelcomeScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    updateIsLoading: PropTypes.func.isRequired,
  }

  onButtonPress = async () => {
    const {
      navigation: {
        navigate,
      },
      updateIsLoading,
      updateSMSSent,
      ...props
    } = this.props;

    updateIsLoading(true);

    const [error] = await to(updateSMSSent(props));

    updateIsLoading(false);

    if (!error) {
      Keyboard.dismiss();

      navigate(anonymousRoutes.VERIFY_LOGIN_SCREEN);
    } else {
      handleError(error);
    }
  }

  render = () => {
    const { APP_NAME } = Config;
    const { isLoading } = this.props;

    return (
      <View style={styles.container}>
        <KalleoText styles={styles.headerText} text={`Welcome to ${APP_NAME}!`} />
        <KalleoText styles={styles.subHeaderText} text="Take back your phone." />
        <KalleoText styles={styles.subHeaderText} text="Secure. Identify. Block." />
        <LoginPhoneInput />
        <ActionButton
          buttonContainerStyles={styles.button}
          onPress={this.onButtonPress}
          styles={styles.button}
          title={isLoading ? 'Please Wait...' : 'Get Started'}
        />
      </View>
    );
  }
}

export default DismissKeyboardWithBackgroundImage(WelcomeScreen, 'flexCenterColumn', backgroundImage);
