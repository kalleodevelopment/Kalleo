import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$primaryColor',
    paddingBottom: '10%',
    paddingTop: '14%',
    width: '100%',
  },
  subheader: {
    fontSize: '$fontMedium',
    marginTop: 34,
    color: '$white',
  },
  header: {
    fontSize: '$fontXXLarge',
    marginTop: 8,
    lineHeight: 34,
    color: '$white',
  },
  chronometer: {
    fontSize: '$fontSmall',
    marginTop: 24,
  },
});

export default styles;
