import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$primaryColor',
    paddingTop: '20%',
    width: '100%',
    flex: 1,
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
});

export default styles;
