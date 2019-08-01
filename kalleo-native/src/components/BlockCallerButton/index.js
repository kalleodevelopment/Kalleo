import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import KalleoText from '../KalleoText';
import styles from './styles';
import { blockNumberMutation } from '../../graphql/mutations';
import getRelationCallerIdName from '../../helpers/getRelationCallerIdName';
import { handleError, to } from '../../helpers/handleError';

const blockIcon = require('../../images/block-inverted.png');

@graphql(blockNumberMutation)
class BlockCallerButton extends Component {
  static propTypes = {
    recenter: PropTypes.func.isRequired,
    item: PropTypes.shape({
      phoneNumber: PropTypes.string,
    }),
  }

  static defaultProps = {
    item: {},
  }

  onPress = async () => {
    const { mutate, item: { callerIdName, phoneNumber, listingType }, recenter } = this.props;

    const [error] = await to(mutate({
      variables: {
        input: {
          phoneNumber,
          callerIdName: getRelationCallerIdName(callerIdName, listingType, phoneNumber),
        },
      },
    }));

    if (error) {
      handleError(error);
    } else {
      recenter();
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <Image height={18} source={blockIcon} width={18} />
          <KalleoText styles={styles.text} text="BLOCK" />
        </View>
      </TouchableOpacity>
    );
  }
}

export default BlockCallerButton;

