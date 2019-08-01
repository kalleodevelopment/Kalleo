import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import defaultStyles from './styles';

const rightArrowIcon = require('../../images/arrow-right.png');

const SettingsMenuItem = ({
  icon,
  onPress,
  styles,
  title,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={defaultStyles.container}>
      <KalleoText styles={[styles.title, defaultStyles.title]} text={title} />
      <View style={defaultStyles.icon}>
        <Image source={icon || rightArrowIcon} />
      </View>
    </View>
  </TouchableOpacity>
);

SettingsMenuItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
  ]),
  styles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
};

SettingsMenuItem.defaultProps = {
  icon: undefined,
  styles: {},
};

export default SettingsMenuItem;
