import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
  container: {
    backgroundColor: '$white',
    borderBottomColor: '$grayBorder',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding: '5%',
  },
  missed: {
    fontWeight: 'bold',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: '$fontMini',
  },
});
