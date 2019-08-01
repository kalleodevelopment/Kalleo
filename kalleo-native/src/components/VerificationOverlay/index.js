import React from 'react';
import { View } from 'react-native';
import KalleoActivityIndicator from '../KalleoActivityIndicator';
import styles from './styles';

const VerificationOverlay = () => (
  <View style={styles.container}>
    <KalleoActivityIndicator />
  </View>
);

export default VerificationOverlay;
