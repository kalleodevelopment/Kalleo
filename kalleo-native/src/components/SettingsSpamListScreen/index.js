import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import KalleoFlatList from '../KalleoFlatList';
import RelationListItem from '../RelationListItem';
import { subscriberRelations } from '../../constants/recent-calls';
import getAuthToken from '../../helpers/getAuthToken';
import { flaggedSpamQuery } from '../../graphql/queries';
import { unflagSpamMutation } from '../../graphql/mutations';
import { flaggedSpamSubscribeToMore } from '../../graphql/subscriptions';
import { handleError, to } from '../../helpers/handleError';
import styles from './styles';

@graphql(flaggedSpamQuery, {
  props: props => ({
    ...props,
    subscribeToFlaggedSpam: authToken => (
      props.data.subscribeToMore(flaggedSpamSubscribeToMore(authToken))
    ),
  }),
})
@graphql(unflagSpamMutation)
class SettingsSpamListScreen extends Component {
  static propTypes = {
    data: PropTypes.shape({
      flaggedSpam: PropTypes.arrayOf(PropTypes.object),
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }

  componentWillMount = async () => {
    const [error, authToken] = await to(getAuthToken());
    const { subscribeToFlaggedSpam } = this.props;

    if (!error) {
      subscribeToFlaggedSpam(authToken);
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
    const { data: { flaggedSpam, loading } } = this.props;

    return (
      <View style={styles.container}>
        <KalleoFlatList
          data={flaggedSpam}
          listItemComponent={(
            <RelationListItem
              onPress={this.onPress}
              type={subscriberRelations.FLAGGED_SPAM}
            />
          )}
          loading={loading}
        />
      </View>
    );
  }
}

export default SettingsSpamListScreen;
