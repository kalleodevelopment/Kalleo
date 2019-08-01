import React from 'react';
import { View } from 'react-native';
import RecentCallsList from '../RecentCallsList';
import KalleoHeader from '../KalleoHeader';
import withNativePermission from '../withNativePermission';
import { requiredPermissions } from '../../constants/native-permissions';
import styles from './styles';

const RecentCallsScreen = () => (
  <View style={styles.container}>
    <KalleoHeader />
    <RecentCallsList />
  </View>
);

export default withNativePermission(RecentCallsScreen, requiredPermissions.MICROPHONE);
