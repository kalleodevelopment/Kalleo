import React, { Component } from 'react';
import { Linking, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import KalleoHeader from '../KalleoHeader';
import DeactivatedNotice from '../DeactivatedNotice';
import SettingsMenuCallerId from '../SettingsMenuCallerId';
import SettingsMenuItem from '../SettingsMenuItem';
import getSettingsMenu from '../../helpers/getSettingsMenu';
import { removeAsyncStorageItem } from '../../helpers/getSetAsyncStorage';
import { mapDispatchToProps, mapStateToProps } from './redux';
import styles from './styles';

@connect(mapStateToProps, mapDispatchToProps)
class SettingsMenuScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    subscriberIsDeactivated: PropTypes.bool.isRequired,
    updateAuthIsAuthenticated: PropTypes.func.isRequired,
  }

  handleFaqPress = () => {
    const { KALLEO_MARKETING_FAQ } = Config;

    Linking.openURL(KALLEO_MARKETING_FAQ);
  }

  handleSignoutPress = () => {
    const { updateAuthIsAuthenticated } = this.props;
    const { AUTH_ID_TOKEN } = Config;

    removeAsyncStorageItem(AUTH_ID_TOKEN);
    updateAuthIsAuthenticated(false);
  }

  renderDeactivatedNotice = () => <DeactivatedNotice />

  render = () => {
    const { navigation: { navigate }, subscriberIsDeactivated } = this.props;

    const settingsMenu = getSettingsMenu(subscriberIsDeactivated);

    return (
      <View style={styles.container}>
        <KalleoHeader />
        {subscriberIsDeactivated ? this.renderDeactivatedNotice() : null}
        <SettingsMenuCallerId />
        {Object.values(settingsMenu).map(({ screenToNavigateTo, title, ...rest }) => (
          <SettingsMenuItem
            {...rest}
            key={title}
            onPress={() => navigate(screenToNavigateTo, { title })}
            title={title}
          />
        ))}
        <SettingsMenuItem
          onPress={this.handleFaqPress}
          title="FAQ"
        />
        <SettingsMenuItem
          onPress={this.handleSignoutPress}
          title="Sign Out"
        />
      </View>
    );
  }
}

export default SettingsMenuScreen;

