import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import defaultStyles from './styles';

const stateStyles = {
  1: 'active',
};

const ActionImage = ({
  buttonStyles,
  source,
  onPress,
  title,
  textStyles,
  state,
}) => (
  <View style={defaultStyles.container}>
    <TouchableOpacity
      onPress={onPress}
      style={[defaultStyles.buttonContainer, buttonStyles]}
    >
      <Image
        source={source}
        style={defaultStyles[stateStyles[state]]}
      />
    </TouchableOpacity>
    <Text style={[defaultStyles.text, textStyles]}>
      {title}
    </Text>
  </View>
);

ActionImage.propTypes = {
  onPress: PropTypes.func.isRequired,
  source: PropTypes.node.isRequired,
  buttonStyles: PropTypes.node,
  title: PropTypes.string,
  textStyles: PropTypes.node,
  state: PropTypes.number,
};

ActionImage.defaultProps = {
  buttonStyles: null,
  title: null,
  textStyles: null,
  state: 0,
};

export default ActionImage;
