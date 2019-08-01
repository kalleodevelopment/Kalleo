import EStyleSheet from 'react-native-extended-stylesheet';
import { subscriberRelations, listingTypes, callTypes } from '../../constants/recent-calls';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  [subscriberRelations.BLOCKED_NUMBER]: {
    color: '$redBlockedDark',
  },
  [listingTypes.SPAM]: {
    color: '$redBlockedDark',
  },
  [listingTypes.UNIDENTIFIED]: {
    color: '$linkColor',
  },
  [callTypes.OUTGOING]: {
    color: '$linkColor',
  },
  icon: {
    marginRight: '10%',
  },
});
