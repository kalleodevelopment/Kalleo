import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Keyboard, TextInput, View } from 'react-native';
import { times } from 'lodash';
import { anonymousRoutes } from '../../constants/routes';
import { mapDispatchToProps, mapStateToProps } from './redux';
import styles from './styles';

@connect(mapStateToProps, mapDispatchToProps)
class VerifyLoginInput extends Component {
  static propTypes = {
    updateVerificationCode: PropTypes.func.isRequired,
    verificationCode: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeRoute: PropTypes.string,
    maxLength: PropTypes.number,
  }

  static defaultProps = {
    activeRoute: undefined,
    maxLength: 1,
  }

  componentDidUpdate(prevProps) {
    const { activeRoute } = this.props;

    if (!prevProps.activeRoute && activeRoute === anonymousRoutes.VERIFY_LOGIN_SCREEN) {
      this['input-0'].focus();
    }
  }

  onChangeText = (value, index) => {
    const { maxLength, updateVerificationCode } = this.props;

    updateVerificationCode(value, index);

    const nextInput = this[`input-${index + 1}`];

    if (value.length === maxLength && nextInput) {
      nextInput.focus();
    } else if (value.length === maxLength && !nextInput) {
      Keyboard.dismiss();
    }
  }

  render = () => {
    const { maxLength, verificationCode } = this.props;

    return (
      <View style={styles.container}>
        {times(verificationCode.length, index => (
          <TextInput
            clearTextOnFocus
            key={index}
            keyboardType="numeric"
            maxLength={maxLength}
            onChangeText={value => this.onChangeText(value, index)}
            style={styles.input}
            underlineColorAndroid="transparent"
            value={verificationCode[index]}
            ref={(ref) => {
              this[`input-${index}`] = ref;
            }}
          />
        ))}
      </View>
    );
  }
}
export default VerifyLoginInput;
