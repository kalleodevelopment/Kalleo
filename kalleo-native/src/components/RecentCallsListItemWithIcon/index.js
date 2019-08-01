import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import styles from './styles';

const RecentCallsListItemWithIcon = ({ icon, name, type }) => (
  <View style={styles.container}>
    <Image source={icon} style={styles.icon} />
    <KalleoText styles={styles[type]} text={name} />
  </View>
);

RecentCallsListItemWithIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecentCallsListItemWithIcon;
