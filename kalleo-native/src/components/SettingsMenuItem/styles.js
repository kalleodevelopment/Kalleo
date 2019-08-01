import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '$grayBorder',
    flexDirection: 'row',
    padding: '5%',
  },
  title: {
    fontSize: '$fontMedium',
    width: '90%',
  },
  icon: {
    alignItems: 'flex-end',
    width: '10%',
  },
});
