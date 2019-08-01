import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import VerifyActivationShield from '../VerifyActivationShield';
import { settingsRoutes } from '../../constants/routes';
import initiateVerifyActivation from '../../helpers/initiateVerifyActivation';
import { initiateVerificationMutation } from '../../graphql/mutations';
import mapStateToProps from './redux';

@graphql(initiateVerificationMutation)
@connect(mapStateToProps)
class SettingsVerifyActivationScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    verificationFailed: PropTypes.bool.isRequired,
    verificationSuccessful: PropTypes.bool.isRequired,
  }

  componentDidMount = () => {
    initiateVerifyActivation(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    const { navigation: { dispatch, goBack } } = this.props;
    const { verificationFailed, verificationSuccessful } = nextProps;

    if (verificationFailed) {
      goBack();
    } else if (verificationSuccessful) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: settingsRoutes.SETTINGS_MENU_SCREEN })],
      });

      dispatch(resetAction);
    }
  }

  render = () => <VerifyActivationShield />
}

export default SettingsVerifyActivationScreen;
