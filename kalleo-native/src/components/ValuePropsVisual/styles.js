import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: '5%',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },
  text: {
    fontSize: '$fontMedium',
    lineHeight: 28,
    marginLeft: '15%',
    marginRight: '15%',
    textAlign: 'center',
  },
});

export default styles;
