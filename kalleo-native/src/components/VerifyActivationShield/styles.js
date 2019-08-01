import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    height: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  header: {
    color: '$primaryColor',
    fontSize: '$fontXXLarge',
  },
  subheader: {
    fontSize: '$fontMedium',
    marginTop: '5%',
    textAlign: 'center',
  },
  shieldContainer: {
    marginTop: '10%',
    height: 120,
  },
});

export default styles;
