import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$primaryColor',
    flex: 0.5,
    justifyContent: 'center',
    paddingTop: '5%',
  },
  text: {
    color: '$white',
    fontSize: '$fontLarge',
    lineHeight: 30,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
});

export default styles;
