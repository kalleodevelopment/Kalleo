import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import KalleoActivityIndicator from '../KalleoActivityIndicator';
import KalleoEmptyList from '../KalleoEmptyList';
import styles from './styles';

class KalleoFlatList extends Component {
  static propTypes = {
    listItemComponent: PropTypes.node.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    data: [],
  }

  keyExtractor = item => item._id // eslint-disable-line no-underscore-dangle

  renderListItem = ({ item }) => React.cloneElement(this.props.listItemComponent, { item })

  render = () => {
    const { data, loading } = this.props;

    if (loading) {
      return <KalleoActivityIndicator />;
    } else if (isEmpty(data)) {
      return <KalleoEmptyList />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderListItem}
        />
      </View>
    );
  }
}

export default KalleoFlatList;
