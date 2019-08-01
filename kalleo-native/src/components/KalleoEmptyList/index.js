import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

const shieldImage = require('../../images/gray-sheild.png');

const KalleoEmptyList = () => (
  <View style={styles.container}>
    <Image source={shieldImage} />
  </View>
);

export default KalleoEmptyList;
