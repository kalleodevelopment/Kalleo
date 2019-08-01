import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import styles from './styles';

const spamIcon = require('../../images/flag-inverted.png');

class FlagSpamCallerButton extends Component {
  static propTypes = {
    openSelectSpamTypeModal: PropTypes.func.isRequired,
  }

  onPress = () => {
    const { openSelectSpamTypeModal, ...props } = this.props;

    openSelectSpamTypeModal(props);
  }

  render = () => (
    <TouchableOpacity onPress={this.onPress}>
      <View style={styles.container}>
        <Image height={18} source={spamIcon} width={18} />
        <KalleoText styles={styles.text} text="FLAG" />
      </View>
    </TouchableOpacity>
  )
}

export default FlagSpamCallerButton;

