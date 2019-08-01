import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Config from 'react-native-config';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DismissKeyboardHOC from '../DismissKeyboardHOC';
import KalleoHeader from '../KalleoHeader';
import KalleoText from '../KalleoText';
import KalleoTextInput from '../KalleoTextInput';
import ActionButton from '../ActionButton';
import { sendFeedbackEmailMutation } from '../../graphql/mutations';
import { handleError, to } from '../../helpers/handleError';
import showAlertDialog from '../../helpers/showAlertDialog';
import { mapDispatchToProps, mapStateToProps } from './redux';
import styles from './styles';

@graphql(sendFeedbackEmailMutation)
@connect(mapStateToProps, mapDispatchToProps)
class FeedbackScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    updateSubscriberFeedback: PropTypes.func.isRequired,
    subscriberFeedback: PropTypes.string,
  }

  static defaultProps = {
    subscriberFeedback: '',
  }

  onSendPress = async () => {
    const { sendSubscriberFeedback, updateIsLoading, ...props } = this.props;

    updateIsLoading(true);

    const [error] = await to(sendSubscriberFeedback(props));

    updateIsLoading(false);

    if (error) {
      handleError(error);
    } else {
      const { APP_NAME } = Config;

      showAlertDialog({
        title: 'Success',
        message: `Thank you! Your feedback has been sent to ${APP_NAME}.`,
      });
    }
  }

  render = () => {
    const { isLoading, subscriberFeedback, updateSubscriberFeedback } = this.props;

    return (
      <View style={styles.container}>
        <KalleoHeader />
        <View style={styles.feedbackContainer}>
          <View style={styles.headerContainer}>
            <KalleoText
              styles={styles.header}
              text={`Let us know what we can do to improve ${Config.APP_NAME}.`}
            />
            <KalleoText
              styles={styles.subheader}
              text="Improvements, issues, and complaints — we want your input."
            />
          </View>
          <KalleoText text="How can we help?" />
          <KalleoTextInput
            multiline
            onChangeText={updateSubscriberFeedback}
            styles={styles.input}
            value={subscriberFeedback}
          />
          <ActionButton
            isLoading={isLoading}
            buttonContainerStyles={styles.sendButtonContainer}
            onPress={this.onSendPress}
            title="Send"
          />
        </View>
      </View>
    );
  }
}

export default DismissKeyboardHOC(FeedbackScreen, {
  behavior: Platform.OS === 'android' ? 'padding' : null,
});
