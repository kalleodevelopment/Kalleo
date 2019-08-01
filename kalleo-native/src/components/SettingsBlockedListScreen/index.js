import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import KalleoFlatList from '../KalleoFlatList';
import RelationListItem from '../RelationListItem';
import getAuthToken from '../../helpers/getAuthToken';
import { blockedNumbersQuery } from '../../graphql/queries';
import { unblockNumberMutation } from '../../graphql/mutations';
import { blockedNumbersSubscribeToMore } from '../../graphql/subscriptions';
import { subscriberRelations } from '../../constants/recent-calls';
import { handleError, to } from '../../helpers/handleError';
import styles from './styles';

@graphql(blockedNumbersQuery, {
  props: props => ({
    ...props,
    subscribeToBlockedNumbers: authToken => (
      props.data.subscribeToMore(blockedNumbersSubscribeToMore(authToken))
    ),
  }),
})
@graphql(unblockNumberMutation)
class SettingsBlockedListScreen extends Component {
  static propTypes = {
    data: PropTypes.shape({
      blockedNumbers: PropTypes.arrayOf(PropTypes.object),
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    subscribeToBlockedNumbers: PropTypes.func.isRequired,
  }

  componentWillMount = async () => {
    const [error, authToken] = await to(getAuthToken());
    const { subscribeToBlockedNumbers } = this.props;

    if (!error) {
      subscribeToBlockedNumbers(authToken);
    }
  }

  onPress = async (phoneNumber) => {
    const { mutate } = this.props;

    const [error] = await to(mutate({
      variables: {
        phoneNumber,
      },
    }));

    if (error) {
      handleError(error);
    }
  }

  render = () => {
    const { data: { blockedNumbers, loading } } = this.props;

    return (
      <View style={styles.container}>
        <KalleoFlatList
          data={blockedNumbers}
          listItemComponent={(
            <RelationListItem
              onPress={this.onPress}
              type={subscriberRelations.BLOCKED_NUMBER}
            />
          )}
          loading={loading}
        />
      </View>
    );
  }
}

export default SettingsBlockedListScreen;
