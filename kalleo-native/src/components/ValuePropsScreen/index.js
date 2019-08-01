import React from 'react';
import { View } from 'react-native';
import ValuePropsHeader from '../ValuePropsHeader';
import ValuePropsVisual from '../ValuePropsVisual';
import ValuePropsNavigation from '../ValuePropsNavigation';
import styles from './styles';

const ValuePropsScreen = () => (
  <View style={styles.container}>
    <ValuePropsHeader />
    <ValuePropsVisual />
    <ValuePropsNavigation />
  </View>
);

export default ValuePropsScreen;
