import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import { subscriberRelations } from '../../constants/recent-calls';
import styles from './styles';

const RelationListItem = ({ item: { callerIdName, phoneNumber, _id }, onPress, type }) => (
  <View key={_id} style={styles.container}>
    <KalleoText text={callerIdName} styles={styles.callerIdName} />
    <TouchableOpacity onPress={() => onPress(phoneNumber)} style={styles.onPress} >
      <View>
        <KalleoText
          styles={styles.buttonText}
          text={type === subscriberRelations.BLOCKED_NUMBER ? 'Unblock' : 'Not Spam'}
        />
      </View>
    </TouchableOpacity>
  </View>
);

RelationListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.keys(subscriberRelations)).isRequired,
  item: PropTypes.shape({
    callerIdName: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

RelationListItem.defaultProps = {
  item: {},
};

export default RelationListItem;
