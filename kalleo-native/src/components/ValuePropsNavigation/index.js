import React from 'react';
import { View } from 'react-native';
import ValuePropsNavigationIcons from '../ValuePropsNavigationIcons';
import ValuePropsNavigationLinks from '../ValuePropsNavigationLinks';
import styles from './styles';

const ValuePropsNavigation = () => (
  <View style={styles.container}>
    <ValuePropsNavigationIcons />
    <ValuePropsNavigationLinks />
  </View>
);

export default ValuePropsNavigation;
