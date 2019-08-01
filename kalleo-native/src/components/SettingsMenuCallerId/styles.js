import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$grayLightBackgroundColor',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  title: {
    fontSize: '$fontMedium',
    marginBottom: '4%',
  },
  callerIdName: {
    color: '$primaryColor',
    fontSize: '$fontXLarge',
    marginBottom: '3%',
  },
  phoneNumber: {
    fontSize: '$fontMedium',
  },
});
