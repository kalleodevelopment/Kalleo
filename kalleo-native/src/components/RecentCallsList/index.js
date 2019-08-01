import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import to from 'await-to-js';
import Config from 'react-native-config';
import { getAsyncStorageItem } from '../../helpers/getSetAsyncStorage';
import RecentCallsListItemWrapper from '../RecentCallsListItemWrapper';
import KalleoFlatList from '../KalleoFlatList';
import SelectSpamTypeModalContainer from '../../containers/SelectSpamTypeModalContainer';
import { recentCallsQuery } from '../../graphql/queries';
import { callsSubscribeToMore } from '../../graphql/subscriptions';
import styles from './styles';

@graphql(recentCallsQuery, {
  props: props => ({
    ...props,
    subscribeToCalls: authToken => (
      props.data.subscribeToMore(callsSubscribeToMore(authToken))
    ),
  }),
})
class RecentCallsList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.func.isRequired,
      recentCalls: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    subscribeToCalls: PropTypes.func.isRequired,
  }

  componentWillMount = async () => {
    const { AUTH_ID_TOKEN } = Config;
    const { subscribeToCalls, data: { refetch } } = this.props;

    const [error, authToken] = await to(getAsyncStorageItem(AUTH_ID_TOKEN));

    if (!error) {
      subscribeToCalls(authToken);
    }

    refetch();
  }

  render = () => {
    const { data: { loading, recentCalls } } = this.props;

    return (
      <View style={styles.container}>
        <SelectSpamTypeModalContainer />
        <KalleoFlatList
          data={recentCalls}
          listItemComponent={<RecentCallsListItemWrapper />}
          loading={loading}
        />
      </View>
    );
  }
}

export default RecentCallsList;
