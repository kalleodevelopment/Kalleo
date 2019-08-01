import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import VerifyActivationShield from '../VerifyActivationShield';
import { onboardRoutes } from '../../constants/routes';
import initiateVerifyActivation from '../../helpers/initiateVerifyActivation';
import { initiateVerificationMutation } from '../../graphql/mutations';
import mapStateToProps from './redux';

@graphql(initiateVerificationMutation)
@connect(mapStateToProps)
class OnboardVerifyActivationScreen extends Component {
  static propTypes = {
    activeRoute: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }

  static defaultProps = {
    activeRoute: {},
  }

  componentWillReceiveProps = (nextProps) => {
    const { activeRoute: { routeName } = {} } = nextProps;

    const isCurrentScreen = routeName === onboardRoutes.ONBOARD_VERIFY_ACTIVATION_SCREEN;

    if (isCurrentScreen) {
      initiateVerifyActivation(this.props);
    }
  }

  render = () => <VerifyActivationShield />
}

export default OnboardVerifyActivationScreen;
