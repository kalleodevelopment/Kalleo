import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import KalleoText from '../KalleoText';
import defaultStyles from './styles';

class ActionButton extends Component {
  static propTypes = {
    // Functionality
    onPress: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,

    // Styles
    buttonContainerStyles: PropTypes.node,
    buttonTextStyles: PropTypes.node,

    // Text
    title: PropTypes.string.isRequired,
    disableTextTransform: PropTypes.bool,

    // Icons
    leftIcon: PropTypes.oneOfType([
      PropTypes.shape({ uri: PropTypes.string }),
      PropTypes.number,
    ]),
    rightIcon: PropTypes.oneOfType([
      PropTypes.shape({ uri: PropTypes.string }),
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    isDisabled: false,
    isLoading: false,
    buttonContainerStyles: null,
    buttonTextStyles: null,
    disableTextTransform: false,
    leftIcon: null,
    rightIcon: null,
  }

  static renderIcon(icon) {
    return icon ? <View style={defaultStyles.icon}>{icon}</View> : null;
  }

  render() {
    const {
      buttonContainerStyles,
      buttonTextStyles,
      disableTextTransform,
      isDisabled,
      isLoading,
      leftIcon,
      onPress,
      rightIcon,
      title,
    } = this.props;

    const buttonKey = isDisabled ? 'buttonDisabled' : 'button';
    const textKey = isDisabled ? 'textDisabled' : 'text';

    const text = isLoading ? 'Please wait...' : title;

    return (
      <View style={defaultStyles.container}>
        <TouchableOpacity
          onPress={isDisabled ? () => {} : onPress}
          style={[defaultStyles[buttonKey], buttonContainerStyles]}
        >
          {ActionButton.renderIcon(leftIcon)}
          <KalleoText
            styles={[defaultStyles[textKey], buttonTextStyles]}
            text={disableTextTransform ? text : text.toUpperCase()}
          />
          {ActionButton.renderIcon(rightIcon)}
        </TouchableOpacity>
      </View>
    );
  }
}

export default ActionButton;
