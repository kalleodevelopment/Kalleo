import React from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import DismissKeyboardHOC from '../DismissKeyboardHOC';
import CallerIdFormContainer from '../../containers/CallerIdFormContainer';
import KalleoText from '../KalleoText';
import styles from './styles';

const CreateCallerId = () => (
  <View>
    <View style={styles.container}>
      <KalleoText
        styles={styles.header}
        text={`Create a profile and join ${Config.APP_NAME} in taking back your phone.`}
      />
      <KalleoText
        styles={styles.subheader}
        text="We&#39;ll use your name to setup your caller ID."
      />
    </View>
    <CallerIdFormContainer />
  </View>
);

export default DismissKeyboardHOC(CreateCallerId);
