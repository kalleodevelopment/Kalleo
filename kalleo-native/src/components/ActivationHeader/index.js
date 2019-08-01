import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import KalleoText from '../KalleoText';
import ActivationDeactivationCallButton from '../ActivationDeactivationCallButton';
import CopyStarCodeButton from '../CopyStarCodeButton';
import { accountStatuses, activationStatuses } from '../../constants/statuses';
import { initiateActivationCallMutation } from '../../graphql/mutations';
import { handleError, to } from '../../helpers/handleError';
import mapStateToProps from './redux';
import getStyles from './styles';

@connect(mapStateToProps)
@graphql(initiateActivationCallMutation)
class ActivationHeader extends PureComponent {
  static propTypes = {
    accountStatus: PropTypes.oneOf(Object.keys(accountStatuses)).isRequired,
    activationStatus: PropTypes.oneOf(Object.keys(activationStatuses)).isRequired,
    forwardingCode: PropTypes.string.isRequired,
  }

  onPress = async () => {
    const { activationStatus, mutate } = this.props;

    if (activationStatus === activationStatuses.UNSTARTED) {
      const [error] = await to(mutate());

      if (error) {
        handleError(error);
      }
    }
  }

  subscriberAccountIncomplete = () => this.props.accountStatus === accountStatuses.INCOMPLETE

  renderCopyButton = () => {
    const { forwardingCode } = this.props;

    if (Platform.OS !== 'ios') return null;

    return (
      <CopyStarCodeButton
        onPress={this.onPress}
        starCode={forwardingCode}
      />
    );
  }

  render = () => {
    const { activationStatus, forwardingCode } = this.props;

    const subscriberAccountIncomplete = this.subscriberAccountIncomplete();
    const styles = getStyles(subscriberAccountIncomplete);

    return (
      <View style={styles.container}>
        {subscriberAccountIncomplete ? <KalleoText styles={styles.header} text="Activate kalleo!" /> : null}
        <KalleoText
          styles={styles.subheader}
          text="We’ll need to forward your phone number to enable kalleo. This process is completely safe."
        />
        <ActivationDeactivationCallButton
          onPress={this.onPress}
          phoneNumber={forwardingCode}
          status={activationStatus}
          type="ACTIVATION"
        />
        {this.renderCopyButton()}
      </View>
    );
  }
}

export default ActivationHeader;
