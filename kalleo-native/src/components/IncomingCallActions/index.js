import React from 'react';
import { View, Image, NativeModules } from 'react-native';
import KalleoText from '../KalleoText';
import ActionImage from '../ActionImage';
import styles from './styles';

const answerIcon = require('../../images/phone-accept.png');
const ignoreHangupIcon = require('../../images/phone-ignore-end.png');
const identifiedBykalleoLogo = require('../../images/identified-kalleo.png');

const { KalleoBridge } = NativeModules;

const IncomingCallActions = () => (
  <View style={styles.container}>
    <View style={styles.containerTop}>
      <ActionImage
        buttonStyles={styles.hangUpTouchable}
        onPress={() => KalleoBridge.reject()}
        source={ignoreHangupIcon}
      />
      <ActionImage
        buttonStyles={styles.answerTouchable}
        onPress={() => KalleoBridge.answer()}
        source={answerIcon}
      />
    </View>
    <View style={styles.containerBottom}>
      <KalleoText
        styles={styles.identifiedText}
        text="Identified by"
      />
      <Image
        style={styles.identifiedLogo}
        source={identifiedBykalleoLogo}
      />
    </View>
  </View>
);

export default IncomingCallActions;
