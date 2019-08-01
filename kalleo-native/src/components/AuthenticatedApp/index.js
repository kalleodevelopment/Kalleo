import React, { Component } from 'react';
import { Platform } from 'react-native';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import to from 'await-to-js';
import Config from 'react-native-config';
import PushNotificationHandler from 'react-native-push-notification';
import deepEqual from 'deep-equal';
import Loading from '../Loading';
import OngoingCallScreen from '../OngoingCallScreen';
import IncomingCallScreen from '../IncomingCallScreen';
import { getAsyncStorageItem } from '../../helpers/getSetAsyncStorage';
import getActiveRoute from '../../helpers/getActiveRoute';
import { onboardStatuses } from '../../constants/statuses';
import incomingCall from '../../constants/incomingCall';
import { getAuthenticatedScreens } from '../../routes';
import { subscriberQuery } from '../../graphql/queries';
import { subscriberUpdatedSubscribeToMore } from '../../graphql/subscriptions';
import { mapStateToProps, mapDispatchToProps } from './redux';
import '../../config/pushNotifications';

@graphql(subscriberQuery, {
  props: props => ({
    ...props,
    subscribeToSubscriber: authToken => (
      props.data.subscribeToMore(subscriberUpdatedSubscribeToMore(authToken))
    ),
  }),
})
@connect(mapStateToProps, mapDispatchToProps)
class AuthenticatedApp extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      subscriber: PropTypes.shape({
        activationStatus: PropTypes.string,
        deactivationStatus: PropTypes.string,
        onboardStatus: PropTypes.string,
      }),
    }).isRequired,
    checkActivationStatus: PropTypes.func.isRequired,
    checkDeactivationStatus: PropTypes.func.isRequired,
    incomingCall: PropTypes.shape({
      status: PropTypes.string,
    }).isRequired,
    subscribeToSubscriber: PropTypes.func.isRequired,
    subscriber: PropTypes.shape({
      activationStatus: PropTypes.string,
      deactivationStatus: PropTypes.string,
      onboardStatus: PropTypes.oneOf(Object.keys(onboardStatuses)),
    }).isRequired,
    updateActiveRoute: PropTypes.func.isRequired,
    updateAuthIsAuthenticated: PropTypes.func.isRequired,
    updateSubscriber: PropTypes.func.isRequired,
  }

  async componentWillMount() {
    const { AUTH_ID_TOKEN } = Config;
    const { subscribeToSubscriber } = this.props;

    const [error, authToken] = await to(getAsyncStorageItem(AUTH_ID_TOKEN));

    if (!error) {
      subscribeToSubscriber(authToken);
    }
  }

  async componentDidMount() {
    try {
      await PushNotificationHandler.abandonPermissions();
      await PushNotificationHandler.requestPermissions();
    } catch (error) {
      console.error(`Unable to register for push notifications: ${error.message}`);
    }
  }

  async componentWillReceiveProps(nextProps) {
    const {
      checkActivationStatus,
      checkDeactivationStatus,
      data: {
        loading,
        subscriber = {},
      },
    } = nextProps;

    if (!loading && (subscriber.activationStatus !== this.props.subscriber.activationStatus)) {
      checkActivationStatus(subscriber);
    }

    if (!loading && (subscriber.deactivationStatus !== this.props.subscriber.deactivationStatus)) {
      checkDeactivationStatus(subscriber);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      data: {
        error,
        subscriber,
      },
      updateSubscriber,
      updateAuthIsAuthenticated,
    } = this.props;

    if (error) {
      updateAuthIsAuthenticated(false);
    }

    if (!deepEqual(prevProps.data.subscriber, subscriber)) {
      updateSubscriber(subscriber);
    }
  }

  renderAuthenticatedAppScreens() {
    const { subscriber, updateActiveRoute } = this.props;

    const AuthenticatedAppScreens = getAuthenticatedScreens(subscriber);

    return (
      <AuthenticatedAppScreens
        onNavigationStateChange={(prev, current) => updateActiveRoute(getActiveRoute(current))}
      />
    );
  }

  render() {
    const { status } = this.props.incomingCall;

    if (status === incomingCall.INCOMING_CALL_PENDING && Platform.OS === 'android') {
      return <IncomingCallScreen />;
    }

    if (status === incomingCall.INCOMING_CALL_ANSWERED) {
      return <OngoingCallScreen />;
    }

    const { subscriber } = this.props;

    return !isEmpty(subscriber) ? this.renderAuthenticatedAppScreens() : <Loading />;
  }
}

export default AuthenticatedApp;
