import React from 'react';
import { View } from 'react-native';
import OngoingCallHeaderContainer from '../../containers/OngoingCallHeaderContainer';
import OngoingCallActions from '../OngoingCallActions';
import styles from './styles';

const OngoingCallScreen = () => (
  <View style={styles.container}>
    <OngoingCallHeaderContainer />
    <OngoingCallActions />
  </View>
);

export default OngoingCallScreen;
