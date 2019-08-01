import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import spamTypes from '../../constants/spamTypes';
import styles from './styles';

const selectedIcon = require('../../images/selected.png');

class SelectSpamTypeModalOptions extends Component {
  static propTypes = {
    updateSelectedSpamType: PropTypes.func.isRequired,
    selectedSpamType: PropTypes.string,
  }

  static defaultProps = {
    selectedSpamType: '',
  }

  static renderSelectedIcon() {
    return (
      <Image source={selectedIcon} style={styles.selectedIcon} />
    );
  }

  render() {
    const { selectedSpamType, updateSelectedSpamType } = this.props;

    return (
      <View style={styles.container}>
        {spamTypes.map((type) => {
          const isSelected = type.key === selectedSpamType;

          const buttonStyles = isSelected ? styles.selectedButton : styles.button;
          const textStyles = isSelected ? styles.selectedText : styles.text;

          // TODO: Adjust styles for ActionButton to handle optional icons
          // const leftIcon = isSelected ? SelectSpamTypeModalOptions.renderSelectedIcon() : null;

          return (
            <View key={type.key}>
              <ActionButton
                disableTextTransform
                buttonContainerStyles={buttonStyles}
                buttonTextStyles={textStyles}
                onPress={() => updateSelectedSpamType(type.key)}
                title={type.value}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

export default SelectSpamTypeModalOptions;
