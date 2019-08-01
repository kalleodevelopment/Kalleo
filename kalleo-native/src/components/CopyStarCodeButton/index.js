import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Clipboard, View } from 'react-native';
import { Button } from 'native-base';
import KalleoText from '../KalleoText';
import showAlertDialog from '../../helpers/showAlertDialog';
import styles from './styles';

class CopyStarCodeButton extends Component {
  static propTypes = {
    starCode: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    textStyles: PropTypes.any,
  }

  static defaultProps = {
    onPress: () => {},
    textStyles: undefined,
  }

  onPress = () => {
    const { onPress, starCode } = this.props;

    Clipboard.setString(starCode);

    showAlertDialog({
      title: 'Star Code Copied',
      message: 'Open your phone app, paste the number, and call.',
      buttons: [{
        text: 'Ok',
        style: 'cancel',
      }],
    });

    if (onPress) {
      onPress();
    }
  }

  render = () => {
    const { starCode, textStyles } = this.props;

    return (
      <View style={styles.view}>
        <Button transparent onPress={this.onPress}>
          <KalleoText
            text={`Copy ${starCode}`}
            styles={[styles.text, textStyles]}
          />
        </Button>
      </View>
    );
  }
}

export default CopyStarCodeButton;
