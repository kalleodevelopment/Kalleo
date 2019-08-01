import EStyleSheet from 'react-native-extended-stylesheet';

const shared = {
  margin: '10%',
};

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$white',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  },
  activationButtonContainer: {
    ...shared,
  },
  deactivationButtonContainer: {
    ...shared,
    backgroundColor: '$redBlockedDark',
  },
});
