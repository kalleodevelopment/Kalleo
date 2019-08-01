import React from 'react';
import { View } from 'react-native';
import KalleoText from '../KalleoText';
import styles from './styles';

const DeactivatedNotice = () => (
  <View style={styles.container}>
    <KalleoText styles={styles.text} text="You are currently deactivated." />
  </View>
);

export default DeactivatedNotice;
