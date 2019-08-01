import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { intersection, isEmpty } from 'lodash';
import RecentCallsListItem from '../RecentCallsListItem';
import BlockCallerButton from '../BlockCallerButton';
import FlagSpamCallerButtonContainer from '../../containers/FlagSpamCallerButtonContainer';
import { listingTypes, subscriberRelations as relations } from '../../constants/recent-calls';

class RecentCallsListItemWrapper extends Component {
  static propTypes = {
    item: PropTypes.shape({
      subscriberRelations: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(relations))),
    }),
  }

  static defaultProps = {
    item: {},
  }

  isSwiperDisabled = () => {
    const { item: { listingType, subscriberRelations } } = this.props;

    const relationsFound = intersection(subscriberRelations, Object.keys(relations));

    return !isEmpty(relationsFound) || listingType === listingTypes.SPAM;
  }

  recenter = () => {
    const { swipeable: { recenter } } = this;

    recenter();
  }

  renderListItem = () => <RecentCallsListItem recentCall={this.props.item} />

  renderRightButtons = () => {
    const propsWithMethod = {
      ...this.props,
      recenter: this.recenter,
    };

    return [
      <FlagSpamCallerButtonContainer {...propsWithMethod} />,
      <BlockCallerButton {...propsWithMethod} />,
    ];
  }

  renderSwipeableWrapper = () => (
    <Swipeable
      rightButtons={this.renderRightButtons()}
      onRef={(ref) => {
        this.swipeable = ref;
      }}
    >
      {this.renderListItem()}
    </Swipeable>
  )

  renderWrapper = () => <View>{this.renderListItem()}</View>

  render = () => (
    this.isSwiperDisabled() ? this.renderWrapper() : this.renderSwipeableWrapper()
  )
}

export default RecentCallsListItemWrapper;
