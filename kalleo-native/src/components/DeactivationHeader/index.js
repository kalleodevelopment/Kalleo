import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types'; import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import ActivationDeactivationCallButton from '../ActivationDeactivationCallButton';
import CopyStarCodeButton from '../CopyStarCodeButton';
import KalleoText from '../KalleoText';

import { deactivationStatuses } from '../../constants/statuses';
import { initiateDeactivationCallMutation } from '../../graphql/mutations';
import { handleError, to } from '../../helpers/handleError';
import mapStateToProps from './redux';
import styles from './styles';

@connect(mapStateToProps)
@graphql(initiateDeactivationCallMutation)
class DeactivationHeader extends Component {
  static propTypes = {
    deactivationStatus: PropTypes.oneOf(Object.keys(deactivationStatuses)).isRequired,
    unforwardingCode: PropTypes.string.isRequired,
  }

  onPress = async () => {
    const { deactivationStatus, mutate } = this.props;

    if (deactivationStatus === deactivationStatuses.UNSTARTED) {
      const [error] = await to(mutate());

      if (error) {
        handleError(error);
      }
    }
  }

  renderCopyButton = () => {
    const { unforwardingCode } = this.props;

    const includeCopyButton = Platform.OS === 'ios';

    if (!includeCopyButton) return null;

    return (
      <CopyStarCodeButton
        onPress={this.onPress}
        starCode={unforwardingCode}
        textStyles={styles.copyStarCodeButton}
      />
    );
  }

  render = () => {
    const { deactivationStatus, unforwardingCode } = this.props;

    return (
      <View style={styles.container}>
        <KalleoText
          styles={styles.subheader}
          text="We’ll need to call the unforwarding number to deactivate kalleo."
        />
        <ActivationDeactivationCallButton
          onPress={this.onPress}
          phoneNumber={unforwardingCode}
          status={deactivationStatus}
          type="DEACTIVATION"
        />
        {this.renderCopyButton()}
      </View>
    );
  }
}

export default DeactivationHeader;
