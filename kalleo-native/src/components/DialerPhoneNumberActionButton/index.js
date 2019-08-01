import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const DialerPhoneNumberActionButton = ({ icon, isHidden, onPress }) => (
  <TouchableOpacity onPressIn={onPress} style={styles.container}>
    <View style={isHidden ? styles.isHidden : null}>
      <Image source={icon} />
    </View>
  </TouchableOpacity>
);

DialerPhoneNumberActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
  ]).isRequired,
  isHidden: PropTypes.bool,
};

DialerPhoneNumberActionButton.defaultProps = {
  isHidden: false,
};

export default DialerPhoneNumberActionButton;
