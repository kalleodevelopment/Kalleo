import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import styles from './styles';

const KalleoTextTouchable = ({
  containerStyles,
  onPress,
  text,
  textStyles,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, containerStyles]}>
    <View>
      <KalleoText styles={textStyles} text={text} />
    </View>
  </TouchableOpacity>
);

KalleoTextTouchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  containerStyles: PropTypes.node,
  textStyles: PropTypes.node,
};

KalleoTextTouchable.defaultProps = {
  containerStyles: null,
  textStyles: null,
};

export default KalleoTextTouchable;
