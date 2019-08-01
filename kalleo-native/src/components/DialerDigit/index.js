import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import styles from './styles';

class DialerDigit extends Component {
  static propTypes = {
    alphabet: PropTypes.string,
    digit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    onPress: PropTypes.func.isRequired,
  }

  static defaultProps = {
    alphabet: '',
  }

  renderAlphabet() {
    const { alphabet } = this.props;

    return alphabet
      ? <KalleoText styles={styles.alphabet} text={alphabet} />
      : null;
  }

  render() {
    const { onPress, digit } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <KalleoText styles={styles.digit} text={`${digit}`} />
        {this.renderAlphabet()}
      </TouchableOpacity>
    );
  }
}

export default DialerDigit;
