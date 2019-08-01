import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import CallerIdFormInput from '../CallerIdFormInput';
import ActionButton from '../ActionButton';
import { onboardRoutes, settingsRoutes } from '../../constants/routes';
import { updateCallerIdMutation } from '../../graphql/mutations';
import { handleError, to } from '../../helpers/handleError';
import showAlertDialog from '../../helpers/showAlertDialog';
import styles from './styles';

@graphql(updateCallerIdMutation)
class CallerIdForm extends Component {
  static propTypes = {
    updateCallerId: PropTypes.func.isRequired,
    updateField: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    activeRoute: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }

  static defaultProps = {
    activeRoute: {},
    email: null,
    firstName: null,
    lastName: null,
  }

  onButtonPress = async () => {
    const {
      activeRoute: {
        routeName,
      },
      navigation: {
        goBack,
        navigate,
      },
      updateCallerId,
      ...props
    } = this.props;

    const [error] = await to(updateCallerId(props));

    if (error) {
      handleError(error);
    } else if (routeName !== settingsRoutes.UPDATE_CALLER_ID_SCREEN) {
      navigate(onboardRoutes.ACTIVATION_DEACTIVATION_SCREEN);
    } else {
      showAlertDialog({
        title: 'Success',
        message: 'Caller ID information successfully updated.',
        buttons: [{
          title: 'Ok',
          onPress: goBack,
        }],
      });
    }
  }

  render = () => {
    const {
      activeRoute: {
        routeName,
      },
      email,
      firstName,
      lastName,
      updateField,
    } = this.props;

    return (
      <View style={styles.container}>
        <CallerIdFormInput
          label="First Name"
          onChangeText={value => updateField('firstName', value)}
          placeholder="Enter your first name"
          returnKeyType="next"
          value={firstName}
        />
        <CallerIdFormInput
          label="Last Name"
          onChangeText={value => updateField('lastName', value)}
          placeholder="Enter your last name"
          returnKeyType="next"
          value={lastName}
        />
        <CallerIdFormInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email Address"
          onChangeText={value => updateField('email', value)}
          placeholder="Enter your email address"
          returnKeyType="go"
          value={email}
        />
        <View style={styles.buttonWrapper}>
          <ActionButton
            onPress={this.onButtonPress}
            title={routeName === settingsRoutes.UPDATE_CALLER_ID_SCREEN ? 'Save' : 'Next'}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(CallerIdForm);
