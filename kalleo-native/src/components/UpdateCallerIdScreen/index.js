import React from 'react';
import { View } from 'react-native';
import DismissKeyboardHOC from '../DismissKeyboardHOC';
import CallerIdFormContainer from '../../containers/CallerIdFormContainer';
import styles from './styles';

const UpdateCallerIdScreen = () => (
  <View style={styles.container}>
    <CallerIdFormContainer />
  </View>
);

export default DismissKeyboardHOC(UpdateCallerIdScreen, { behavior: 'padding' });
