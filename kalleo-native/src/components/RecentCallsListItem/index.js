import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import KalleoText from '../KalleoText';
import RecentCallsListItemWithIcon from '../RecentCallsListItemWithIcon';
import formatRecentCallsDate from '../../helpers/formatRecentCallsDate';
import placeOutgoingCall from '../../helpers/placeOutgoingCall';
import { createOutgoingCallMutation } from '../../graphql/mutations';
import {
  callStatuses,
  callTypes,
  listingTypes,
  subscriberRelations as relations,
} from '../../constants/recent-calls';
import styles from './styles';

const blockIcon = require('../../images/block.png');
const flagIcon = require('../../images/flag.png');
const unknownIcon = require('../../images/unknown.png');
const outgoingIcon = require('../../images/outgoing-call.png');

@graphql(createOutgoingCallMutation)
class RecentCallsListItem extends Component {
  static propTypes = {
    recentCall: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      listingType: PropTypes.oneOf(Object.keys(listingTypes)).isRequired,
      phoneNumber: PropTypes.string.isRequired,
      status: PropTypes.oneOf(Object.keys(callStatuses)),
      subscriberRelations: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(relations))),
      type: PropTypes.string.isRequired,
      callerIdName: PropTypes.string,
    }).isRequired,
  }

  onPress = () => {
    const { recentCall: { phoneNumber } } = this.props;

    placeOutgoingCall({ phoneNumber, ...this.props });
  }

  renderBlockedCall = ({ callerIdName }) => (
    <RecentCallsListItemWithIcon
      icon={blockIcon}
      name={`${callerIdName} - Blocked`}
      type={relations.BLOCKED_NUMBER}
    />
  )

  renderCaller = ({ callerIdName }) => <KalleoText text={callerIdName} />

  renderMissedCall = ({ callerIdName }) => (
    <KalleoText styles={styles.missed} text={callerIdName} />
  )

  renderOutgoingCall = ({ callerIdName }) => (
    <RecentCallsListItemWithIcon
      icon={outgoingIcon}
      name={callerIdName}
      type={callTypes.OUTGOING}
    />
  )

  renderSpam = ({ callerIdName }) => (
    <RecentCallsListItemWithIcon
      icon={flagIcon}
      name={`${callerIdName} - Spam`}
      type={listingTypes.SPAM}
    />
  )

  renderUnidentified = ({ phoneNumber }) => (
    <RecentCallsListItemWithIcon
      icon={unknownIcon}
      name={`Unknown ${phoneNumber}`}
      type={listingTypes.UNIDENTIFIED}
    />
  )

  renderName = () => {
    const {
      listingType,
      status,
      subscriberRelations,
      type,
      ...recentCall
    } = this.props.recentCall;

    let howToRenderName;

    if (!isEmpty(subscriberRelations)) {
      if (subscriberRelations.includes(relations.BLOCKED_NUMBER)) {
        howToRenderName = 'renderBlockedCall';
      } else if (subscriberRelations.includes(relations.FLAGGED_SPAM)) {
        howToRenderName = 'renderSpam';
      } else {
        howToRenderName = 'renderCaller';
      }
    } else if (status === callStatuses.MISSED) {
      howToRenderName = 'renderMissedCall';
    } else if (type === callTypes.OUTGOING) {
      howToRenderName = 'renderOutgoingCall';
    } else {
      switch (listingType) {
        case listingTypes.SPAM:
          howToRenderName = 'renderSpam';
          break;
        case listingTypes.UNIDENTIFIED:
          howToRenderName = 'renderUnidentified';
          break;
        default:
          howToRenderName = 'renderCaller';
          break;
      }
    }

    return (
      <View>{this[howToRenderName](recentCall)}</View>
    );
  }

  render = () => {
    const { createdAt } = this.props.recentCall;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          {this.renderName()}
          <View style={styles.dateContainer}>
            <KalleoText
              styles={styles.dateText}
              text={formatRecentCallsDate(createdAt)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default RecentCallsListItem;
