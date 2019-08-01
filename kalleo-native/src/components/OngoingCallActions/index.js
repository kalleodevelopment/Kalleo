import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, NativeModules } from 'react-native';
import ActionImage from '../ActionImage';
import { mapStateToProps, mapDispatchToProps } from './redux';
import styles from './styles';

const ignoreHangupIcon = require('../../images/phone-ignore-end.png');
const muteIcon = require('../../images/mute-icon.png');
const speakerIcon = require('../../images/speaker.png');

const { KalleoBridge } = NativeModules;

@connect(mapStateToProps, mapDispatchToProps)
class OngoingCallActions extends PureComponent {
  static propTypes = {
    muteState: PropTypes.number.isRequired,
    speakerState: PropTypes.number.isRequired,
    toggleMuteState: PropTypes.func.isRequired,
    toggleSpeakerState: PropTypes.func.isRequired,
  }

  onMutePress = () => {
    const { muteState, toggleMuteState } = this.props;

    toggleMuteState(1 - muteState);

    KalleoBridge.toggleMute();
  }

  onSpeakerPress = () => {
    const { speakerState, toggleSpeakerState } = this.props;

    toggleSpeakerState(1 - speakerState);

    KalleoBridge.toggleSpeaker();
  }

  render() {
    const { muteState, speakerState } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <ActionImage
            buttonStyles={speakerState ? styles.active : styles.inactive}
            onPress={this.onSpeakerPress}
            source={speakerIcon}
            title="Speaker"
            state={speakerState}
          />
          <ActionImage
            buttonStyles={muteState ? styles.active : styles.inactive}
            onPress={this.onMutePress}
            source={muteIcon}
            title="Mute"
            state={muteState}
          />
        </View>
        <View style={styles.containerBottom}>
          <ActionImage
            buttonStyles={styles.hangUpTouchable}
            onPress={() => KalleoBridge.hangUp()}
            source={ignoreHangupIcon}
          />
        </View>
      </View>
    );
  }
}

export default OngoingCallActions;
