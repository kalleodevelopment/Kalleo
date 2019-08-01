import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Body, Header, Left, Right } from 'native-base';
import { dashboardRoutes } from '../../constants/routes';
import mapStateToProps from './redux';
import styles from './styles';

const kalleoLogo = require('../../images/kalleo-logo-menu.png');
const deactivatedIcon = require('../../images/deactivated.png');

@connect(mapStateToProps)
class KalleoHeader extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    subscriberIsDeactivated: PropTypes.bool.isRequired,
    activeRoute: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }

  static defaultProps = {
    activeRoute: {
      routeName: '',
    },
  }

  onPress = () => {
    const { navigation: { navigate } } = this.props;

    navigate(dashboardRoutes.SETTINGS_SCREEN);
  }

  renderDeactivatedIcon = () => {
    const { activeRoute: { routeName } = {} } = this.props;

    const onPress = routeName !== dashboardRoutes.SETTINGS_SCREEN
      ? this.onPress
      : () => {};

    return (
      <TouchableOpacity onPress={onPress}>
        <Image source={deactivatedIcon} />
      </TouchableOpacity>
    );
  }

  render = () => {
    const { subscriberIsDeactivated } = this.props;

    return (
      <Header style={styles.container}>
        <Left style={styles.center} />
        <Body style={styles.center}>
          <Image source={kalleoLogo} />
        </Body>
        <Right style={styles.center}>
          {subscriberIsDeactivated ? this.renderDeactivatedIcon() : null}
        </Right>
      </Header>
    );
  }
}

export default withNavigation(KalleoHeader);

