import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import styles from './styles';

const IncomingCallHeader = ({ callerId }) => (
  <View style={styles.container}>
    <KalleoText
      styles={styles.subheader}
      text="Incoming call"
    />
    <KalleoText
      styles={styles.header}
      text={callerId}
    />
  </View>
);


IncomingCallHeader.propTypes = {
  callerId: PropTypes.string.isRequired,
};

export default IncomingCallHeader;
