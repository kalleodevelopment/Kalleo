import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerTop: {
    flexDirection: 'row',
    flex: 2,
    paddingTop: '15%',
    paddingBottom: '15%',
    justifyContent: 'space-between',
  },
  containerBottom: {
    flex: 2,
    justifyContent: 'center',
  },
  hangUpTouchable: {
    borderColor: '$redActionImage',
  },
  inactive: {
    borderColor: '$grayActionImage',
  },
  active: {
    borderColor: '$primaryColor',
  },
});

export default styles;
