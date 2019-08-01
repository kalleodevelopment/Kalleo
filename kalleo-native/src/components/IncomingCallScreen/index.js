import React from 'react';
import { View } from 'react-native';
import IncomingCallHeaderContainer from '../../containers/IncomingCallHeaderContainer';
import IncomingCallActions from '../IncomingCallActions';
import styles from './styles';

const IncomingCallScreen = () => (
  <View style={styles.container}>
    <IncomingCallHeaderContainer />
    <IncomingCallActions />
  </View>
);

export default IncomingCallScreen;
