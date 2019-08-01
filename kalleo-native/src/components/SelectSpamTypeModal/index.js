import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { graphql } from 'react-apollo';
import KalleoText from '../KalleoText';
import ActionButton from '../ActionButton';
import SelectSpamTypeModalOptionsContainer from '../../containers/SelectSpamTypeModalOptionsContainer';
import { flagSpamMutation } from '../../graphql/mutations';
import { handleError, to } from '../../helpers/handleError';
import styles from './styles';

const spamIcon = require('../../images/flag-large.png');
const closeIcon = require('../../images/close-modal.png');

@graphql(flagSpamMutation)
class SelectSpamTypeModal extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    updateIsLoading: PropTypes.func.isRequired,
    updateIsModalVisible: PropTypes.func.isRequired,
  }

  onSubmit = async () => {
    const { flagAsSpam, updateIsLoading, ...props } = this.props;

    updateIsLoading(true);

    const [error] = await to(flagAsSpam(props));

    updateIsLoading(false);

    if (error) {
      handleError(error);
    }
  }

  render = () => {
    const { isLoading, isModalVisible, updateIsModalVisible } = this.props;

    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContentContainer}>
          <View style={styles.modalHeader}>
            <Image height={50} source={spamIcon} width={50} />
            <KalleoText
              styles={styles.modalHeaderText}
              text="What type of spam is this?"
            />
            <TouchableOpacity
              onPress={() => updateIsModalVisible(false)}
              style={styles.closeIcon}
            >
              <Image height={16} source={closeIcon} width={16} />
            </TouchableOpacity>
          </View>
          <SelectSpamTypeModalOptionsContainer />
          <ActionButton
            isLoading={isLoading}
            buttonContainerStyles={styles.submitButtonContainer}
            onPress={this.onSubmit}
            title="Submit"
          />
        </View>
      </Modal>
    );
  }
}

SelectSpamTypeModal.propTypes = {
};

export default SelectSpamTypeModal;
