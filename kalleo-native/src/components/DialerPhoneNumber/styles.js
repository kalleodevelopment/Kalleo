import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  phoneNumber: {
    color: '$primaryColor',
    fontSize: '$fontXLarge',
    textAlign: 'center',
  },
});
