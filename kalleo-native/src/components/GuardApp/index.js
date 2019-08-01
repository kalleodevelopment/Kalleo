import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthenticatedApp from '../AuthenticatedApp';
import AnonymusApp from '../AnonymusApp';
import Loading from '../Loading';

class GuardApp extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    verifiedAuthentication: PropTypes.bool.isRequired,
    verifySubscriber: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { verifiedAuthentication, verifySubscriber } = this.props;

    if (!verifiedAuthentication) {
      verifySubscriber();
    }
  }

  render() {
    const { isAuthenticated, verifiedAuthentication } = this.props;

    if (!verifiedAuthentication) {
      return <Loading />;
    }

    return !isAuthenticated ? <AnonymusApp /> : <AuthenticatedApp />;
  }
}

export default GuardApp;
