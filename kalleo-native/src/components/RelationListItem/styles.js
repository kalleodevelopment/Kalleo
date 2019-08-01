import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    borderBottomColor: '$grayBorder',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: '5%',
  },
  callerIdName: {
    padding: '2%',
    width: '75%',
  },
  onPress: {
    borderRadius: '$actionBorderRadius',
    borderColor: '$grayDisabled',
    borderWidth: 1,
    padding: '2%',
    width: '25%',
  },
  buttonText: {
    textAlign: 'center',
  },
});
